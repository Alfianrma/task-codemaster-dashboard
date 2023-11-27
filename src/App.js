import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
// import { AppRoutes } from './routes/AppRoutes';
// import theme from './theme';
import '@fontsource/montserrat/400.css';
import '@fontsource/plus-jakarta-sans/700.css';
import UnderConstruction from './components/UnderConstruction';
import SignIn from './pages/signin/SignIn';
import theme from './theme';
import AdminLayout from './layouts/AdminLayouts';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  );
}

export default App;
