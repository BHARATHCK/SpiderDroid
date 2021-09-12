import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import "../components/DateTimePicker.css";

import theme from "../theme";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../utils/apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
