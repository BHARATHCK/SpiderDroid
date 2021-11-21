import NavBar from "../components/IndexPageComponents/NavBar";
import Layout from "../components/IndexPageComponents/Layout";
import { withApolloClient } from "../utils/apollo-client";
import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import { useGetBlogsQuery } from "../generated/graphql";
import { Spinner } from "@chakra-ui/spinner";
import matter from "gray-matter";
import { useState } from "react";
import Image from "next/image";
import { useViewport } from "../components/InteractiveComponents/ViewPortHook";
import NextLink from "next/link";

const ExploreTravelogues = () => {
  const { width } = useViewport();
  const breakpoint = 700;
  const breakPointTablet = 900;
  const { data, loading, fetchMore, error } = useGetBlogsQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [blogList, setBlogList] = useState([]);
  console.log("BLOG LIST CHANGING : ", blogList);
  let tempBlogList = [];
  if (data && !loading) {
    data.getBlogs.map((blog) => {
      const { data, content } = matter(blog.blogData);
      tempBlogList.push({
        yamlData: data,
        MdContent: content,
        id: blog.id,
      });
    });
  }

  return (
    <>
      <NavBar />
      <Layout variantType="regular">
        <Flex alignItems="center" alignContent="center" textAlign="center" direction="column">
          <Box>
            <Text fontSize="2xl" fontWeight="extrabold">
              Travelogues
            </Text>
          </Box>
          <Box>
            <Text fontSize="lg">Adventure chronicles from road trip adventures</Text>
          </Box>
        </Flex>
        <Box mt={20}>
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
              {tempBlogList.map((blog) => (
                <NextLink href={"/travelogue/" + blog.id}>
                  <Box
                    maxW="md"
                    borderWidth="1px"
                    cursor="pointer"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Image
                      width={250}
                      height={200}
                      layout="responsive"
                      src={blog.yamlData.cover_image}
                      alt={"no image"}
                    />

                    <Box p="6">
                      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                        {blog.yamlData.title}
                      </Box>
                      <Box>
                        <Box as="span" color="gray.600" fontSize="sm">
                          {blog.yamlData.date}
                        </Box>
                      </Box>

                      <Box d="flex" mt="2" alignItems="center">
                        <Box as="span" ml="2" color="gray.600" fontSize="sm">
                          {blog.yamlData.excerpt}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </NextLink>
              ))}
            </Grid>
          )}
        </Box>
      </Layout>
    </>
  );
};

export default withApolloClient()(ExploreTravelogues);
