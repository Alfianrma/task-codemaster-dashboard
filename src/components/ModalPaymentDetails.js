import { Flex, Text } from '@chakra-ui/react';
import Modal from './Modal';
import dayjs from 'dayjs';

const ModalPaymentDetails = ({ data, isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Payment Details"
      withCloseIcon={true}
    >
      <Flex direction="column" gap="10px">
        <Flex direction="row" gap="10px" justifyContent="space-between">
          <Text fontSize="14px" color="gray.500">
            Name
          </Text>
          <Text fontSize="14px" color="black">
            {data?.student.name}
          </Text>
        </Flex>
        <Flex direction="row" gap="10px" justifyContent="space-between">
          <Text fontSize="14px" color="gray.500">
            Payment Schedule
          </Text>
          <Text fontSize="14px" color="black">
            {data?.schedule}
          </Text>
        </Flex>
        <Flex direction="row" gap="10px" justifyContent="space-between">
          <Text fontSize="14px" color="gray.500">
            Bill Number
          </Text>
          <Text fontSize="14px" color="black">
            {data?.number}
          </Text>
        </Flex>
        <Flex direction="row" gap="10px" justifyContent="space-between">
          <Text fontSize="14px" color="gray.500">
            Amount Paid
          </Text>
          <Text fontSize="14px" color="black">
            {data?.amount}
          </Text>
        </Flex>
        <Flex direction="row" gap="10px" justifyContent="space-between">
          <Text fontSize="14px" color="gray.500">
            Balance Amount
          </Text>
          <Text fontSize="14px" color="black">
            {data?.balance}
          </Text>
        </Flex>
        <Flex
          direction="row"
          gap="10px"
          justifyContent="space-between"
          mb="10px"
        >
          <Text fontSize="14px" color="gray.500">
            Date of Admission
          </Text>
          <Text fontSize="14px" color="black">
            {dayjs(data?.student.admissionDate).format('DD-MMM, YYYY')}{' '}
          </Text>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ModalPaymentDetails;
