import React from 'react';
import {
  Box,
  Text,
  Image,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  IconButton,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
import Constants from '../../constants';
import { useCustomToast } from '../../utils';
import ModalFormStudent from '../../components/ModalFormStudent';
import { useStudent } from '../../services';

const Students = () => {
  const [searchParams] = useSearchParams();
  const { studentList, deleteStudents } = useStudent();
  const { showToastSuccess, showToastError } = useCustomToast();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);

  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    getListData(1, searchParams.get('search'));
  }, [searchParams]);

  const getListData = async (page, q) => {
    try {
      const res = await studentList(page, q);
      setData(res?.data);
      setLinks(res?.links);
    } catch (e) {
      showToastError(e.message);
    }
  };

  const handleEdit = data => {
    setSelectedData(data);
    setShowFormPopup(true);
  };

  const handleOpenDeletePopup = data => {
    setSelectedData(data);
    setShowDeletePopup(true);
  };

  const handleCloseFormPopup = () => {
    setSelectedData(null);
    setShowFormPopup(false);
  };

  const handleCloseDeletePopup = () => {
    setSelectedData(null);
    setShowDeletePopup(false);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteStudents(selectedData?.id);
      setShowDeletePopup(false);
      showToastSuccess(res?.message);
      getListData();
    } catch (e) {
      showToastError(e || e?.error);
    }
  };

  return (
    <Box>
      <TableContainer>
        <Flex justifyContent="space-between">
          <Text color="gray.900" fontSize="24px" fontWeight="bold">
            Student List
          </Text>
          <Button
            onClick={() => setShowFormPopup(true)}
            text="ADD NEW STUDENT"
            isBggradient
          />
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="gray.500"></Th>
              <Th color="gray.500">Name</Th>
              <Th color="gray.500">Email</Th>
              <Th color="gray.500">Phone</Th>
              <Th color="gray.500">Enroll Number</Th>
              <Th color="gray.500">Date of Admission</Th>
              <Th color="gray.500"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(item => {
              return (
                <Tr bgColor="gray.50" key={`payment-item-${item.id}`}>
                  <Td>
                    <Box
                      width="65px"
                      height={'55px'}
                      borderRadius="8px"
                      overflow="hidden"
                    >
                      <Image
                        src={item.imageUrl}
                        width="100%"
                        height="100%"
                        objectFit="initial"
                      />
                    </Box>
                  </Td>
                  <Td fontSize="14px" color="gray.900">
                    {item?.name}
                  </Td>
                  <Td fontSize="14px" color="gray.900">
                    {item?.email}
                  </Td>
                  <Td fontSize="14px" color="gray.900">
                    {item?.phoneNumber}
                  </Td>
                  <Td fontSize="14px" color="gray.900">
                    {item?.enrollNumber}
                  </Td>
                  <Td fontSize="14px" color="gray.900">
                    {dayjs(item?.admissionDate).format('DD MMM YYYY')}{' '}
                  </Td>
                  <Td>
                    <Flex gap="10px">
                      <IconButton
                        onClick={() => handleEdit(item)}
                        size="s"
                        variant="ghost"
                        aria-label="open menu"
                        color="#667085"
                        icon={<BiEdit />}
                      />
                      <IconButton
                        onClick={() => handleOpenDeletePopup(item)}
                        size="s"
                        variant="ghost"
                        aria-label="open menu"
                        color="#667085"
                        icon={<BiTrashAlt />}
                      />
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination links={links} onClick={getListData} />
      <Modal
        isOpen={showDeletePopup}
        title="Delete Student"
        confirmButtonText="Delete"
        onClose={handleCloseDeletePopup}
        onConfirm={handleDelete}
      >
        <Text fontSize="14px" color="gray.900">
          Are you sure to delete this data? The data can't restore after you
          delete it.
        </Text>
      </Modal>
      <ModalFormStudent
        refresh={getListData}
        data={selectedData}
        isOpen={showFormPopup}
        onClose={handleCloseFormPopup}
      />
    </Box>
  );
};

export default Students;
