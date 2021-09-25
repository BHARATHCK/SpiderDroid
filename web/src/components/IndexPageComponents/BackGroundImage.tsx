import { Box } from "@chakra-ui/layout";
import Image from "next/image";
import React from "react";
import backgroundImage from "../../../assets/backgroundImage.jpg";
import { useViewport } from "../InteractiveComponents/ViewPortHook";

const BackGroundImage = () => {
  const { width } = useViewport();
  const breakpoint = 700;

  return (
    <>
      <Box zIndex={-1000}>
        <Image
          height={width < breakpoint ? "800px" : ""}
          layout="responsive"
          src={backgroundImage}
        ></Image>
      </Box>
    </>
  );
};

export default BackGroundImage;
