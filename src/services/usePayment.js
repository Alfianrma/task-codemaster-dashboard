import { services } from '.';

export default () => {
  const paymentList = async (page = 1, q) => {
    try {
      const response = await services.get('payments', {
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

  const addPayments = async body => {
    try {
      const response = await services.post('payments', body);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  const deletePayments = async id => {
    try {
      const response = await services.delete(`payments/${id}`);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  const updatePayment = async (id, body) => {
    try {
      const response = await services.put(`payments/${id}`, body);
      return response;
    } catch (error) {
      throw error.response?.data?.message;
    }
  };

  return {
    paymentList,
    addPayments,
    deletePayments,
    updatePayment,
  };
};
