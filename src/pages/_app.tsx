// pages/_app.js
import React from 'react';
import { Box, ChakraProvider, Container, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import logo from '../styles/maurosergio.png';
import theme from '../../theme';

const paddingSize = 5;
const borderRadiusSize = 'sm';
const maxWidthSize = 'container.xl';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={paddingSize}>
        <Container backgroundColor='white' borderRadius={borderRadiusSize} boxShadow='md' maxWidth={maxWidthSize} padding={4}>
          <Stack spacing={4} align='center'>
            <Image maxW="45%" maxH="35%" src={logo.src} />
            {/* <Heading>ProteinX</Heading>
            <Text>Somos una tienda de Suplementos Deportivos con los mejores precios de Cordoba Capital</Text> */}
          </Stack>
          <Divider marginY={6} marginBottom={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App;
