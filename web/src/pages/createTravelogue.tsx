import NavBar from "../components/IndexPageComponents/NavBar";
import Layout from "../components/IndexPageComponents/Layout";
import { withApolloClient } from "../utils/apollo-client";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useAddBlogMutation, useGetBlogsQuery } from "../generated/graphql";
import { Spinner } from "@chakra-ui/spinner";
import matter from "gray-matter";
import { useState } from "react";
import { Wrapper } from "../components/IndexPageComponents/Wrapper";
import { Field, Form, Formik } from "formik";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import {
  Button,
  Input,
  Textarea,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Image,
} from "@chakra-ui/react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import emoji from "remark-emoji";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import RenderReactMarkdown from "../components/InteractiveComponents/RenderReactMarkdown";
import rehypeRaw from "rehype-raw";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/toast";

const ExploreTravelogues = () => {
  const router = useRouter();
  const toast = useToast();
  const [finalHTML, setfinalHTML] = useState("");

  const [travelogueTitle, setTravelogueTitle] = useState("");
  const [travelogueExcerpt, setTravelogueExcerpt] = useState("");
  const [travelogueCoverImage, setTravelogueCoverImage] = useState("");
  const [travelogueBody, setTravelogueBody] = useState("");

  const [addBlog, { loading }] = useAddBlogMutation({ notifyOnNetworkStatusChange: true });

  async function parseMarkdownToHtml(parsedContent) {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(emoji)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(parsedContent);
    let parsedData = String(file);
    console.log("CHECK HERE ******** ", parsedData);
    if (parsedData) {
      setfinalHTML(parsedData);
    }
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
            <Text fontSize="lg">Create Your Travelogue with us.</Text>
          </Box>
        </Flex>
        <Box>
          <Wrapper variant="regular">
            <Tabs mt={10} variant="soft-rounded" colorScheme="green">
              <TabList>
                <Tab>Markdown Editor</Tab>
                <Tab
                  onClick={() => {
                    const { data, content } = matter(travelogueBody);
                    console.log("DATA : ", data);
                    setTravelogueCoverImage(data.cover_image);
                    setTravelogueTitle(data.title);
                    parseMarkdownToHtml(content);
                  }}
                >
                  Preview
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Formik
                    initialValues={{
                      blogBody: `---\ncover_image:\ntitle:\nexcerpt:\n---`,
                    }}
                    onSubmit={async (values, { setErrors }) => {
                      // Use hook function here.
                      const result = await addBlog({
                        variables: {
                          blogData: travelogueBody,
                        },
                      });

                      if (result.data) {
                        router.push("/exploretravelogue");
                      } else {
                        toast({
                          id: "fail-toast",
                          title: "Failed to publish",
                          description: "Please try again later.",
                          status: "error",
                          duration: 6000,
                          isClosable: true,
                          position: "top-right",
                          variant: "left-accent",
                        });
                      }
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <Box backgroundColor="whiteAlpha.800" borderRadius={10}>
                          <Box m={4} pb={10}>
                            <Box mt={10}>
                              <Field
                                name="blogBody"
                                render={({ field }) => (
                                  <FormControl as="fieldset" {...field} isRequired={true}>
                                    <FormLabel as="legend">Blog Content</FormLabel>
                                    <Textarea
                                      size="sm"
                                      name="blogBody"
                                      minW="100%"
                                      placeholder="Add content for your blog"
                                      onChange={(e) => {
                                        setTravelogueBody(e.target.value);
                                      }}
                                    />
                                    <FormHelperText>Add content for the blog</FormHelperText>
                                  </FormControl>
                                )}
                              />
                            </Box>

                            <Button mt="4" colorScheme="red" isLoading={isSubmitting} type="submit">
                              PUBLISH
                            </Button>
                          </Box>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </TabPanel>
                <TabPanel>
                  <Box mb={20}>
                    <Image src={travelogueCoverImage}></Image>
                    <Heading mt={10}>{travelogueTitle}</Heading>
                  </Box>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: finalHTML,
                    }}
                    sx={{
                      "& h1": {
                        fontsize: "20px",
                        fontWeight: "bolder",
                      },
                      "& h2": {
                        fontsize: "1.5em",
                        fontWeight: "bolder",
                      },
                      "& h3": {
                        fontsize: "1.17em",
                        fontWeight: "bolder",
                      },
                      "& h4": {
                        fontsize: "1em",
                        fontWeight: "bolder",
                      },
                      "& h5": {
                        fontsize: "0.83em",
                        fontWeight: "bolder",
                      },
                      "& h6": {
                        fontsize: "0.67em",
                        fontWeight: "bolder",
                      },
                      "& blockquote": {
                        background: "#f9f9f9",
                        borderLeft: "10px solid #ccc",
                        margin: "1.5em 10px",
                        padding: "0.5em 10px",
                        quotes: `"201C""201D""2018""2019"`,
                      },
                      "& p span": {
                        display: "block",
                        whiteSpace: "pre-line",
                        marginTop: "10px",
                      },
                      "& p": {
                        display: "block",
                        whiteSpace: "pre-line",
                        marginTop: "10px",
                      },
                    }}
                  ></Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Wrapper>
        </Box>
      </Layout>
    </>
  );
};

export default withApolloClient()(ExploreTravelogues);
