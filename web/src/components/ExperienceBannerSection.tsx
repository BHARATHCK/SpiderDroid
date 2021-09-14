import { Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import React from "react";
import styles from "./Carousel.module.css";
import Carouselize from "./Carouselize";
import { useViewport } from "./ViewPortHook";

const ExperienceBannerSection = () => {
  const { width } = useViewport();
  const breakpoint = 700;

  let textFontSize = width < breakpoint ? 20 : 40;

  return (
    <Box maxW="100vw">
      <Carouselize
        children={
          <>
            <div className={styles.embla__slide}>
              <Flex alignItems="center" direction={width < breakpoint ? "column" : "row"}>
                <Img
                  src="https://i.ibb.co/dpPTsnH/carousel-Image1.jpg"
                  alt="carousel-Image1"
                  border="0"
                ></Img>
                <Flex direction="column" alignItems="center">
                  <Text fontSize={textFontSize} margin={10}>
                    Find the perfect car to make errand day easier
                  </Text>
                  <Button maxW={200} colorScheme="red">
                    Browse Cars
                  </Button>
                </Flex>
              </Flex>
            </div>
            <div className={styles.embla__slide}>
              <Flex alignItems="center" direction={width < breakpoint ? "column" : "row"}>
                <Img
                  src="https://i.ibb.co/zxTfqSC/carousel-Image2.jpg"
                  alt="carousel-Image2"
                  border="0"
                ></Img>
                <Flex direction="column" alignItems="center">
                  <Text fontSize={textFontSize} margin={10}>
                    Find the perfect car to conquer the great outdoors
                  </Text>
                  <Button maxW={200} colorScheme="red">
                    Browse Cars
                  </Button>
                </Flex>
              </Flex>
            </div>
            <div className={styles.embla__slide}>
              <Flex alignItems="center" direction={width < breakpoint ? "column" : "row"}>
                <Img
                  src="https://i.ibb.co/QvRfDqZ/carousel-Image3.jpg"
                  alt="carousel-Image3"
                  border="0"
                ></Img>
                <Flex direction="column" alignItems="center">
                  <Text fontSize={textFontSize} margin={10}>
                    Find the perfect car to unwind for the weekend
                  </Text>
                  <Button maxW={200} colorScheme="red">
                    Browse Cars
                  </Button>
                </Flex>
              </Flex>
            </div>
            <div className={styles.embla__slide}>
              <Flex alignItems="center" direction={width < breakpoint ? "column" : "row"}>
                <Img
                  src="https://i.ibb.co/7SS0tBJ/carouse-Image4.jpg"
                  alt="carouse-Image4"
                  border="0"
                ></Img>
                <Flex direction="column" alignItems="center">
                  <Text fontSize={textFontSize} margin={10}>
                    Find the perfect car to upgrade your vacation plans
                  </Text>
                  <Button maxW={200} colorScheme="red">
                    Browse Cars
                  </Button>
                </Flex>
              </Flex>
            </div>
            <div className={styles.embla__slide}>
              <Flex alignItems="center" direction={width < breakpoint ? "column" : "row"}>
                <Img
                  src="https://i.ibb.co/HTbn9P5/carousel-Image5.jpg"
                  alt="carousel-Image5"
                  border="0"
                ></Img>
                <Flex direction="column" alignItems="center">
                  <Text fontSize={textFontSize} margin={10}>
                    Find the perfect car for scenic corners , curves
                  </Text>
                  <Button maxW={200} colorScheme="red">
                    Browse Cars
                  </Button>
                </Flex>
              </Flex>
            </div>
          </>
        }
      ></Carouselize>
    </Box>
  );
};

export default ExperienceBannerSection;
