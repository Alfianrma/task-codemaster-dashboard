import { services } from '.';

export default () => {
  const studentList = async (page = 1, q) => {
    try {
      const response = await services.get('students', {
        params: {
          page: page,
          search: q,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const addStudents = async body => {
    try {
      const response = await services.post('students', body);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  const deleteStudents = async id => {
    try {
      const response = await services.delete(`students/${id}`);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  const updateStudent = async (id, body) => {
    try {
      const response = await services.put(`students/${id}`, body);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  return {
    studentList,
    addStudents,
    deleteStudents,
    updateStudent,
  };
};
