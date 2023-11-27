import React from 'react';
import { Image, Box, Text, Center } from '@chakra-ui/react';
import '@fontsource/montserrat';
import '@fontsource/plus-jakarta-sans';

function UnderConstruction() {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        h="100vh"
        flexDirection="column"
      >
        <Image
          src={window.location.origin + '/img_maintenance.jpg'}
          height={400}
          weight={400}
        />
        <Text fontSize="4xl" fontWeight="bold">
          Under Construction
        </Text>
      </Box>
    </Box>

    // <Center flexDirection="column" h="100vh">
    //   <Image
    //     src={window.location.origin + '/img_maintenance.jpg'}
    //     height={400}
    //     weight={400}
    //   />
    //   <Text fontSize="2xl" fontWeight="bold">
    //     Under Construction
    //   </Text>
    // </Center>
  );
}

export default UnderConstruction;
