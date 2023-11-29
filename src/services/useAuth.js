import { services } from '.';

export default () => {
  const signIn = async body => {
    try {
      const response = await services.post('auth', body);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    signIn,
  };
};
