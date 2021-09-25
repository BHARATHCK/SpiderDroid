import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useViewport } from "../InteractiveComponents/ViewPortHook";

const TravelogueSection = () => {
  const { width } = useViewport();
  const breakpoint = 700;

  const transformCard = width < breakpoint ? "translate(25%,-70%);" : "translate(-102%,-160%)";

  return (
    <Box mt={20}>
      <Flex alignItems="end" direction="column" textAlign="center">
        <Box maxW={width < breakpoint ? 300 : 700} minH={250}>
          <Image
            src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632045215/travelogue_pg33rl.jpg"
            width={1920}
            height={1080}
          ></Image>
        </Box>
        <Box
          backgroundColor="black"
          color="white"
          transform={transformCard}
          maxW={width < breakpoint ? "250px" : ""}
        >
          <Flex
            alignItems="center"
            justifyContent="left"
            padding={2}
            direction="column"
            maxW={400}
            zIndex={1000}
          >
            <Heading fontSize={width < breakpoint ? 18 : ""}>FEATURED TRAVELOGUE</Heading>
            <Text fontSize={width < breakpoint ? 12 : ""}>An Amazing travel experience</Text>
            <Text fontSize={width < breakpoint ? 12 : ""}>
              Discover the epic waterfalls, moody weather, and lush forests of coastal Washington.
            </Text>
            <Link fontSize={width < breakpoint ? 12 : ""} mt="10">
              Read more...
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default TravelogueSection;
