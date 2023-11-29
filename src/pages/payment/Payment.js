import React from 'react';
import {
  TableContainer,
  Box,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
import { useCustomToast } from '../../utils';
import { usePayment } from '../../services';
import { BiShow } from 'react-icons/bi';
import dayjs from 'dayjs';
import ModalPaymentDetails from '../../components/ModalPaymentDetails';
const Payment = () => {
  const [searchParams] = useSearchParams();
  const { paymentList } = usePayment();
  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const { showToastError } = useCustomToast();

  useEffect(() => {
    getListData(1, searchParams.get('search'));
  }, [searchParams]);

  const getListData = async (page, q) => {
    try {
      const res = await paymentList(page, q);
      setData(res?.data);
      setLinks(res?.links);
    } catch (e) {
      showToastError(e.message);
    }
  };

  const handleOpenModal = data => {
    setSelectedData(data);
    setShowDetail(true);
  };

  const handleCloseModal = () => {
    setSelectedData(null);
    setShowDetail(false);
  };
  return (
    <Box>
      <TableContainer>
        <Text color="gray.900" fontSize="24px" fontWeight="bold">
          Payment Details
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Payment Schedule</Th>
              <Th>Bill Number</Th>
              <Th>Amount Paid</Th>
              <Th>Balance Amount</Th>
              <Th>Date of Admission</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr bgColor="gray.50" key={`payment-item-${item.id}`}>
                <Td fontSize="14px" color="gray.900">
                  {item?.student.name}
                </Td>
                <Td fontSize="14px" color="gray.900">
                  {item?.schedule}
                </Td>
                <Td fontSize="14px" color="gray.900">
                  {item?.number}
                </Td>
                <Td fontSize="14px" color="gray.900">
                  {item?.amount}
                </Td>
                <Td fontSize="14px" color="gray.900">
                  {item?.balance}
                </Td>
                <Td fontSize="14px" color="gray.900">
                  {dayjs(item?.student.admissionDate).format('DD MMM YYYY')}{' '}
                </Td>
                <Td>
                  <IconButton
                    size="s"
                    variant="ghost"
                    aria-label="open menu"
                    color="#667085"
                    icon={<BiShow />}
                    onClick={() => handleOpenModal(item)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination links={links} onClick={getListData} />
      <ModalPaymentDetails
        data={selectedData}
        isOpen={showDetail}
        onClose={handleCloseModal}
      />
    </Box>
  );
};

export default Payment;
