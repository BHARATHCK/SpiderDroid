import { StarIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, Spinner, Text, WrapItem } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import medal from "../../../assets/ribbon.png";
import { useAllStarHostsQuery } from "../../generated/graphql";
import styles from "../Carousel/Carousel.module.css";
import Carouselize from "../Carousel/Carouselize";
import { useViewport } from "../InteractiveComponents/ViewPortHook";

const AllStarHostsSection = () => {
  const { width } = useViewport();
  const breakpoint = 700;

  const { data, loading } = useAllStarHostsQuery({
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Carouselize
      children={
        !data || loading ? (
          <Spinner
            m="auto"
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          data.allStarReviews.map((p, index) => {
            return (
              <div
                className={
                  width < breakpoint ? styles.embla__slide_cars_mobile : styles.embla__slide_cars
                }
                key={p.id}
              >
                <Box
                  key={p.id + index}
                  mt={20}
                  mb={10}
                  boxShadow="lg"
                  p="6"
                  rounded="md"
                  bg="white"
                  w={250}
                  h={260}
                  transition="all .3s ease-in-out"
                  _hover={{ transform: "translate3d(0px, -4px, 0px)" }}
                >
                  <Flex direction="row">
                    <WrapItem>
                      <Avatar
                        name={p.creator.username}
                        src="https://robohash.org/eumcumqueconsequuntur.png?size=50x50&set=set1"
                      />
                    </WrapItem>
                    <Box ml={5}>
                      <Text fontWeight={600}>{p.creator.username}</Text>
                      <Flex direction="row" alignItems="center">
                        <Image min-height={8} layout="fixed" src={medal}></Image>
                        <Text>All-Star Host</Text>
                      </Flex>
                      <Flex direction="row">
                        <Text>{p.trips}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                  <Flex direction="column">
                    <Flex direction="row">
                      {[...Array(p.points)].map((starIcn, index) => {
                        return <StarIcon w={4} h={4} color="blue.500" key={index} />;
                      })}
                    </Flex>
                    <Text
                      textDecoration="none"
                      display="block"
                      maxH={100}
                      maxW={350}
                      textOverflow=""
                      overflow=""
                      // whiteSpace=""
                    >
                      {p.bookings
                        ? p.bookings[0].comment.length > 0
                          ? p.bookings[0].comment[0].commentText
                          : ""
                        : ""}
                    </Text>
                  </Flex>
                </Box>
              </div>
            );
          })
        )
      }
    />
  );
};

export default AllStarHostsSection;
