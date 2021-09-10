import { Button, Flex, Img, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import styles from "./Carousel.module.css";
import Carouselize from "./Carouselize";

const ExperienceBannerSection = () => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  let textFontSize = isMobile ? 20 : 40;

  console.log("IS MOBILE ---> ", isMobile);
  return (
    <Carouselize
      children={
        <>
          <div className={styles.embla__slide}>
            <Flex alignItems="center" direction={isMobile ? "column" : "row"}>
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
            <Flex alignItems="center" direction={isMobile ? "column" : "row"}>
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
            <Flex alignItems="center" direction={isMobile ? "column" : "row"}>
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
            <Flex alignItems="center" direction={isMobile ? "column" : "row"}>
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
            <Flex alignItems="center" direction={isMobile ? "column" : "row"}>
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
  );
};

export default ExperienceBannerSection;
