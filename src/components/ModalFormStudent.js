import { Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import FormInput from './FormInput';
import Modal from './Modal';
import { useCustomToast } from '../utils';
import { useStudent } from '../services';

const initialState = {
  name: '',
  email: '',
  phoneNumber: '',
  enrollNumber: '',
  admissionDate: '',
};

const ModalFormStudent = ({ data, onClose, isOpen, refresh }) => {
  const { showToastError, showToastSuccess } = useCustomToast();
  const { addStudents, updateStudent } = useStudent();
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({ ...data });
    } else {
      setForm(initialState);
    }
  }, [isOpen]);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    setIsLoading(true);
    try {
      const res = await addStudents({
        ...form,
        admissionDate: dayjs(form.admissionDate).format('YYYY-MM-DD'),
      });
      showToastSuccess(res?.message);
      onClose();
      refresh();
    } catch (e) {
      showToastError(e.message);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const res = await updateStudent(data?.id, {
        ...form,
        admissionDate: dayjs(form.admissionDate).format('YYYY-MM-DD'),
      });
      showToastSuccess(res?.message);
      onClose();
      refresh();
    } catch (e) {
      showToastError(e.message);
    }
    setIsLoading(false);
  };

  return (
    <Modal
      title={data ? 'Edit Student' : 'Add Student'}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={data ? handleUpdate : handleAdd}
      isButtonLoading={isLoading}
      confirmButtonText="Save"
    >
      <Flex direction="column" gap="16px">
        <FormInput
          name="name"
          value={form.name}
          onChange={handleChange}
          label="name"
          placeholder="Enter your name"
        />
        <FormInput
          name="email"
          value={form.email}
          onChange={handleChange}
          label="email"
          placeholder="Enter your email"
        />
        <FormInput
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          label="phone number"
          placeholder="Enter your phone number"
        />
        <FormInput
          name="enrollNumber"
          value={form.enrollNumber}
          onChange={handleChange}
          label="enroll number"
          placeholder="Enter your enroll number"
        />
        <FormInput
          name="admissionDate"
          value={form.admissionDate}
          onChange={handleChange}
          label="admission date"
          placeholder="Enter your admission date"
          type="date"
        />
      </Flex>
    </Modal>
  );
};

export default ModalFormStudent;
