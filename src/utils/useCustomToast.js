import { useToast } from '@chakra-ui/react';

export default () => {
  const toast = useToast();

  const showToastError = message => {
    toast({
      position: 'top-right',
      title: 'error',
      description: message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const showToastSuccess = message => {
    toast({
      position: 'top-right',
      title: 'Success',
      description: message,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return {
    showToastError,
    showToastSuccess,
  };
};
