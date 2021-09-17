import { Box } from "@chakra-ui/react";
import { useViewport } from "./ViewPortHook";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
  return (
    <Box mt="8px" mx="auto" maxW={variant === "regular" ? "900px" : "400px"} width="100%">
      {children}
    </Box>
  );
};
