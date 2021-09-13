import { Box } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
  const [isMobile] = useMediaQuery("(max-width: 700px)");
  console.log("is Mobile ************************* ", isMobile);
  isMobile ? (variant = "small") : (variant = "regular");
  return (
    <Box mt="8px" mx="auto" maxW={variant === "regular" ? "900px" : "400px"} width="100%" mb={400}>
      {children}
    </Box>
  );
};
