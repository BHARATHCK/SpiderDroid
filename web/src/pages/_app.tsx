import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import "../components/DateTimePicker.css";
import "../components/DropZoneUploader.css";
import ViewportProvider from "../components/InteractiveComponents/ViewPortHook";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ViewportProvider>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: false,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </ViewportProvider>
  );
}

export default MyApp;
