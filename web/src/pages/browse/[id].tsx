import { StarIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Badge, Box, Grid } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import NavBar from "../../components/NavBar";
import { useViewport } from "../../components/ViewPortHook";
import { useFilterPostQuery } from "../../generated/graphql";
import { withApolloClient } from "../../utils/apollo-client";

const BrowseCars = ({}) => {
  const { width } = useViewport();
  const breakpoint = 700;
  const breakPointTablet = 900;

  const router = useRouter();

  // If while rehydrating , the router is undefined then do not
  if (!router.query) {
    return null;
  }

  const { category, id } = router.query;

  const { data, loading } = useFilterPostQuery({
    variables: {
      filterCategory: typeof category === "string" ? category : "",
      filterCriteria: typeof id === "string" ? id : "",
    },
    notifyOnNetworkStatusChange: true,
  });

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
              {data.filterPost.map((post) => (
                <Box
                  maxW="md"
                  borderWidth="1px"
                  onClick={() => router.push(`/rental/${post.id}`)}
                  cursor="pointer"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image src={post.imageUrl[0]} alt={"no image"} />

                  <Box p="6">
                    <Box d="flex" alignItems="baseline">
                      {post.trips < 5 ? (
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          New
                        </Badge>
                      ) : (
                        ""
                      )}
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      >
                        {post.trips} trips
                      </Box>
                    </Box>

                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                      {post.carMake} &bull; {post.carModel} &bull; {post.carYear}
                    </Box>
                    <Box>
                      <Box as="span" color="gray.600" fontSize="sm">
                        &#8377; {post.carCostPerDay}/ Day
                      </Box>
                    </Box>

                    <Box d="flex" mt="2" alignItems="center">
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <StarIcon key={i} color={i < post.points ? "teal.500" : "gray.300"} />
                        ))}
                      <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        {0} reviews
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Grid>
          )}
        </Box>
      </Layout>
    </>
  );
};

export default withApolloClient()(BrowseCars);
