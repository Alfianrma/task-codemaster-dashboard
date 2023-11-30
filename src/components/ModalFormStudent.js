import { Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import FormInput from './FormInput';
import Modal from './Modal';
import { useCustomToast } from '../utils';
import { useStudent } from '../services';
import { Form } from 'react-router-dom';

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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (data) {
      setForm({ ...data });
    } else {
      setForm(initialState);
    }
  }, [isOpen]);

  const handleChange = e => {
    if (e.target.name === 'image') {
      setForm({
        ...form,
        image: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleAdd = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await addStudents(formData);
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
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phoneNumber', form.phoneNumber);
      formData.append('enrollNumber', form.enrollNumber);
      formData.append(
        'admissionDate',
        dayjs(form.admissionDate).format('YYYY-MM-DD')
      );
      formData.append('image', selectedImage);

      const res = await updateStudent(data?.id, formData);
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
        <FormInput
          type={'file'}
          name={'image'}
          onChange={handleChange}
          accept={'image/*'}
        />
      </Flex>
    </Modal>
  );
};

//       </Flex>
//     </Modal>
//   );
// };

export default ModalFormStudent;
