import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Image } from "@chakra-ui/react";
import React from "react";

const CarPostCard = ({ property }) => {
  return (
    <Box ml={0} maxW="200" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl} alt={property.imageAlt} />
      <Box p="4">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {property.title}
        </Box>
      </Box>
    </Box>
  );
};

export default CarPostCard;
