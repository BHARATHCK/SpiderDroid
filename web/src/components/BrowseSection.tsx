import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/dist/client/router";
import {
  DestinationsQuery,
  PostsQuery,
  useDestinationsQuery,
  usePostsQuery,
} from "../generated/graphql";
import styles from "./Carousel.module.css";
import Carouselize from "./Carouselize";

interface Props {
  itemsToFetch: string;
}

const BrowseCarouselSection: React.FC<Props> = ({ itemsToFetch }) => {
  const router = useRouter();
  let carData: PostsQuery;
  let destinationData: DestinationsQuery;
  let customError, customLoading;

  if (itemsToFetch === "cars") {
    const { data, loading, error } = usePostsQuery({ notifyOnNetworkStatusChange: true });
    carData = data;
    customError = error;
    customLoading = loading;
  } else {
    const { data, loading, error } = useDestinationsQuery({ notifyOnNetworkStatusChange: true });
    destinationData = data;
    customError = error;
    customLoading = loading;
  }

  if (customError) {
    return <Box>Something Went wrong with the query !!</Box>;
  }
  return (
    <Box>
      {!(carData && destinationData) && customLoading ? (
        <div>Loading...</div>
      ) : (
        <Box maxW="100vw">
          <Carouselize
            key="browseByCars"
            children={
              carData
                ? carData.browseByCarMake.map((car, index) => (
                    <div className={styles.embla__slide_cars} key={car.id}>
                      <div className={styles.embla__slide__inner}>
                        <Box
                          key={car.id + index}
                          onClick={() => router.push(`/browse/${car.carMake}?category=carMake`)}
                          cursor="pointer"
                          mr={2}
                          maxW="200"
                          maxH="200"
                          borderWidth="1px"
                          borderRadius="lg"
                          overflow="hidden"
                          transition="all .3s ease-in-out"
                          _hover={{ transform: "translate3d(0px, -4px, 0px)" }}
                        >
                          <Image src={car.imageUrl[0]} alt={"alt"} />
                          <Box p="4">
                            <Box
                              mt="1"
                              fontWeight="semibold"
                              as="h4"
                              lineHeight="tight"
                              isTruncated
                            >
                              {car.carMake}
                            </Box>
                          </Box>
                        </Box>
                      </div>
                    </div>
                  ))
                : destinationData.browseByDestination.map((destination) => (
                    <div className={styles.embla__slide_cars} key={destination.id}>
                      <div className={styles.embla__slide__inner}>
                        <Box
                          key={destination.id}
                          onClick={() =>
                            router.push(`/browse/${destination.id}?category=destination`)
                          }
                          mr={2}
                          maxW="200"
                          maxH="200"
                          borderWidth="1px"
                          borderRadius="lg"
                          overflow="hidden"
                          transition="all .3s ease-in-out"
                          _hover={{ transform: "translate3d(0px, -4px, 0px)" }}
                        >
                          <Image src={destination.destinationImage} alt={"alt"} />
                          <Box p="4">
                            <Box
                              mt="1"
                              fontWeight="semibold"
                              as="h4"
                              lineHeight="tight"
                              isTruncated
                            >
                              {destination.destinationName}
                            </Box>
                          </Box>
                        </Box>
                      </div>
                    </div>
                  ))
            }
          ></Carouselize>
        </Box>
      )}
    </Box>
  );
};

export default BrowseCarouselSection;
