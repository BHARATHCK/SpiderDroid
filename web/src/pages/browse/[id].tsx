import { StarIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Badge, Box, Grid } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useRouter } from "next/router";
import CarDisplayCard from "../../components/InteractiveComponents/CarDisplayCard";
import Layout from "../../components/IndexPageComponents/Layout";
import NavBar from "../../components/IndexPageComponents/NavBar";
import { useViewport } from "../../components/InteractiveComponents/ViewPortHook";
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
                <CarDisplayCard post={post} />
              ))}
            </Grid>
          )}
        </Box>
      </Layout>
    </>
  );
};

export default withApolloClient()(BrowseCars);
