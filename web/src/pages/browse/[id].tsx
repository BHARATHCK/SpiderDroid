import { StarIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Badge, Box, Flex, Grid } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Skeleton } from "@chakra-ui/skeleton";
import { Spinner } from "@chakra-ui/spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import NavBar from "../../components/NavBar";
import { FilterPostQuery, useFilterPostQuery } from "../../generated/graphql";

const BrowseCars = ({}) => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isTablet] = useMediaQuery("(max-width: 800px)");
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

  console.log(router.query);
  console.log("category : ", category, "   -    pid : ", id);
  console.log(category);

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
              templateColumns={`repeat( ${isMobile ? 2 : 3}, 1fr)`}
              gap={6}
              m={isMobile ? 2 : isTablet ? 4 : 0}
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
        </Box>
      </Layout>
    </>
  );
};

export default BrowseCars;
