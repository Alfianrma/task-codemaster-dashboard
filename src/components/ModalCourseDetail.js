import { priceFormatter } from '../utils';
import Modal from './Modal';
import { Flex, Text } from '@chakra-ui/react';

const ModalCourseDetails = ({ data, isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Course Details"
      withCloseIcon={true}
    >
      <Flex direction="column" gap="10px" mb="10px">
        <Flex direction="row" gap="10px" justifyContent="space-between">
          <Text fontSize="14px" color="gray.500">
            Name
          </Text>
          <Text fontSize="14px" color="black">
            {data?.title}
          </Text>
        </Flex>
        <Flex direction="row" gap="10px" justifyContent="space-between">
          <Text fontSize="14px" color="gray.500">
            Code
          </Text>
          <Text fontSize="14px" color="black">
            {data?.code}
          </Text>
        </Flex>
        <Flex direction="row" gap="10px" justifyContent="space-between">
          <Text fontSize="14px" color="gray.500">
            Credits
          </Text>
          <Text fontSize="14px" color="black">
            {data?.credits}
          </Text>
        </Flex>
        <Flex direction="row" gap="10px" justifyContent="space-between">
          <Text fontSize="14px" color="gray.500">
            Course Location
          </Text>
          <Text fontSize="14px" color="black">
            {data?.location}
          </Text>
        </Flex>
        <Flex direction="row" gap="10px" justifyContent="space-between">
          <Text fontSize="14px" color="gray.500">
            Bootcamp Mentor
          </Text>
          <Text fontSize="14px" color="black">
            {data?.instructor}
          </Text>
        </Flex>
        <Flex direction="row" gap="10px" justifyContent="space-between">
          <Text fontSize="14px" color="gray.500">
            Fee
          </Text>
          <Text fontSize="14px" color="black">
            {priceFormatter(data?.fee)}
          </Text>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ModalCourseDetails;
