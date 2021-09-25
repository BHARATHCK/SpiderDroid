import { Badge, Box, Grid } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import NavBar from "../components/IndexPageComponents/NavBar";
import Layout from "../components/IndexPageComponents/Layout";
import { withApolloClient } from "../utils/apollo-client";
import { useSearchQuery } from "../generated/graphql";
import React from "react";
import Image from "next/image";
import { useViewport } from "../components/InteractiveComponents/ViewPortHook";
import { Spinner } from "@chakra-ui/spinner";
import { StarIcon } from "@chakra-ui/icons";

const SearchPage = () => {
  const { width } = useViewport();
  const breakpoint = 700;
  const breakPointTablet = 900;

  const router = useRouter();

  console.log(router.query.fromDate);
  console.log(router.query.toDate);
  console.log(router.query.destination);

  const { data, loading, error } = useSearchQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      searchDestinationId: parseInt(
        typeof router.query.destination === "string" ? router.query.destination : "",
      ),
      searchFromDate: router.query.fromDate,
      searchToDate: router.query.toDate,
    },
  });

  return (
    <>
      <NavBar />
      <Layout variantType="regular">
        {!data || loading ? (
          <Spinner
            m="auto"
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <Grid
            templateColumns={`repeat( ${width < breakpoint ? 2 : 3}, 1fr)`}
            gap={6}
            m={width < breakpoint ? 2 : width < breakPointTablet ? 4 : 0}
          >
            {data.search.map((post) => (
              <Box
                maxW="md"
                borderWidth="1px"
                onClick={() => router.push(`/rental/${post.id}`)}
                cursor="pointer"
                borderRadius="lg"
                overflow="hidden"
              >
                <Image width="300px" height="300px" src={post.imageUrl[0]} alt={"no image"} />

                <Box p="6">
                  <Box d="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      New
                    </Badge>
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {post.trips} trips &bull;
                    </Box>
                  </Box>

                  <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {post.carMake} &bull; {post.carModel} &bull; {post.carYear}
                  </Box>

                  <Box>
                    {"$1,900.00"}
                    <Box as="span" color="gray.600" fontSize="sm">
                      / wk
                    </Box>
                  </Box>

                  <Box d="flex" mt="2" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon key={i} color={i < 5 ? "teal.500" : "gray.300"} />
                      ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      {34} reviews
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Grid>
        )}
      </Layout>
    </>
  );
};

export default withApolloClient()(SearchPage);
