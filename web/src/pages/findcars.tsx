import { Button } from "@chakra-ui/button";
import { Box, Flex, Grid } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect, useState } from "react";
import CarDisplayCard from "../components/CarDisplayCard";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import { useViewport } from "../components/ViewPortHook";
import { FindCarsQuery, Post, PostQuery, PostsQuery, useFindCarsQuery } from "../generated/graphql";
import { withApolloClient } from "../utils/apollo-client";

const findCars = () => {
  const { width } = useViewport();
  const breakpoint = 700;
  const breakPointTablet = 900;

  const [disableLoadMore, setDisableLoadMore] = useState(false);

  const { data, loading, fetchMore } = useFindCarsQuery({
    variables: { findCarsLimit: 10, findCarsSkipVariable: 0 },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    console.log("UseEffect :: ");
    console.log(data?.findCars?.posts.length);
    if (data?.findCars?.posts.length < 10) {
      console.log("UseEffect :: ");
      setDisableLoadMore(true);
    }
  }, [data?.findCars?.posts]);

  return (
    <>
      <NavBar />
      <Layout variantType="regular">
        <Box>
          {!data || loading ? (
            <Box textAlign="center">
              <Spinner
                m="auto"
                thickness="6px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Box>
          ) : (
            <Grid
              templateColumns={`repeat( ${width < breakpoint ? 2 : 3}, 1fr)`}
              gap={6}
              m={width < breakpoint ? 2 : width < breakPointTablet ? 4 : 0}
            >
              {data.findCars.posts.map((post) => (
                <CarDisplayCard post={post} />
              ))}
            </Grid>
          )}
          <Flex alignItems="center" justifyContent="center">
            <Button
              isDisabled={disableLoadMore}
              isLoading={loading}
              m="10"
              colorScheme="red"
              onClick={async () => {
                await fetchMore({
                  variables: {
                    findCarsSkipVariable: data.findCars.posts.length + 10,
                  },
                });
              }}
            >
              Load More
            </Button>
          </Flex>
        </Box>
      </Layout>
    </>
  );
};

export default withApolloClient()(findCars);
