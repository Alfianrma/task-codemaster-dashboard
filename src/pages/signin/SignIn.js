import { Box, Center, Text, Image, Card, Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import Constants from '../../constants';
import { useAuth } from '../../services';
import { useCustomToast } from '../../utils';

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const { showToastError } = useCustomToast();
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await signIn(form);
      localStorage.setItem('accessToken', res.token);
      console.log(res.token);
      navigate('/admin/dashboard', { replace: true });
    } catch (e) {
      showToastError(e.message);
    }
    setIsLoading(false);
  };
  return (
    <Box
      display="flex"
      minH={'100vh'}
      bgGradient="linear(to-r, #F94449 37.55%, #A62D31 184.78%)"
    >
      <Card w="628px" minH="516px" margin="auto" padding="40px">
        <Image
          // src={Constants.CODEMASTERS_LOGO}
          src={window.location.origin + '/img_logo.png'}
          alignSelf="center"
          width="290px"
          height="32px"
        />
        <Text alignSelf="center">SIGN IN</Text>
        <Text>Enter your credentials to access your token</Text>
        <Box mt="40px" />
        <Flex direction="column" gap="16px">
          <FormInput
            name="email"
            value={form.email}
            onChange={handleChange}
            label="email"
            placeholder="Enter your Email"
          />
          <FormInput
            name="password"
            value={form.password}
            onChange={handleChange}
            label="password"
            type="password"
            placeholder="Enter your password"
          />
        </Flex>
        <Box mt="40px" />
        <Button
          text="Submit"
          isLoading={isLoading}
          onClick={handleSubmit}
          isBggradient
        />
        <Center mt="40px">
          <Stack direction="row" spacing="3px">
            <Text>Forgot your password? </Text>
            <Text color="#F94449">Reset Password</Text>
          </Stack>
        </Center>
      </Card>
    </Box>
    // <Center bg="red.500" h="100vh" px="30%" py="10%">
    //   <Box
    //     bg="white"
    //     w="100%"
    //     h="100%"
    //     p="25px"
    //     borderRadius="10px"
    //     boxShadow="md"
    //     display="flex"
    //     alignItems="center"
    //     justifyItems="center"
    //     flexDirection="column"
    //   >
    //     <Image
    //       src={window.location.origin + '/img_logo.png'}
    //       height="20px"
    //       width="200px"
    //     />
    //     <Text mt="30px" fontStyle="plus-jakarta-sans">
    //       SIGN IN
    //     </Text>
    //     <Text color="grey" fontStyle="plus-jakarta-sans">
    //       Enter your credentials to access your account
    //     </Text>
    //     <Text fontSize="12px" alignSelf="start" mt="20px">
    //       Email
    //     </Text>
    //     <Input placeholder="Enter your email" size="sm" borderRadius="5px" />
    //     <Text fontSize="12px" alignSelf="start" mt="20px">
    //       Password
    //     </Text>
    //     <Input
    //       placeholder="Enter your password"
    //       size="sm"
    //       borderRadius="5px"
    //       type="password"
    //     />
    //     <Button mt="20px" colorScheme="red" size="sm" width="100%">
    //       <Text size="10px" fontWeight="light">
    //         Submit
    //       </Text>
    //     </Button>
    //   </Box>
    // </Center>
  );
};

export default SignIn;
