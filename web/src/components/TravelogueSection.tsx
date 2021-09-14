import { Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import travelogueGif from "../../assets/featuredTravelogue.gif";
import { useViewport } from "./ViewPortHook";

const TravelogueSection = () => {
  const { width } = useViewport();
  const breakpoint = 700;

  const transformCard = width < breakpoint ? "translate(27%,-30%);" : "translate(-62%,-71%)";

  return (
    <Box mt={20}>
      <Flex alignItems="center" direction="column" textAlign="center">
        <Box backgroundColor="gray.200" minW={200} minH={8} zIndex={-100} position="absolute"></Box>
        <Heading>Fuel your daydreams</Heading>
        <Text>
          Stoke your wanderlust with some dreamy photo chronicles of road trip adventures.
        </Text>
        <Button mt={20} colorScheme="red">
          Explore Travelogues
        </Button>
        <Box mt={20} mr={width < breakpoint ? 20 : 40}>
          <Image src={travelogueGif}></Image>
        </Box>
        <Box
          backgroundColor="black"
          color="white"
          transform={transformCard}
          maxW={width < breakpoint ? "280px" : ""}
        >
          <Flex
            justifyContent="left"
            padding={2}
            direction="column"
            maxW={400}
            margin="0 0 0 24px"
            zIndex={1000}
          >
            <Heading>FEATURED TRAVELOGUE</Heading>
            <Text>An Amazing travel experience</Text>
            <Text>
              Discover the epic waterfalls, moody weather, and lush forests of coastal Washington.
            </Text>
            <Link mt="10">Read more...</Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default TravelogueSection;
