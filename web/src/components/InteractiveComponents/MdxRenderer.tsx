import React, { useState } from "react";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { useGetBlogQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import Layout from "../../components/IndexPageComponents/Layout";

const MdxRenderer = ({ blogId }) => {
  const [finalHTML, setfinalHTML] = useState("");
  const router = useRouter();

  const {
    data: blogData,
    loading,
    error,
  } = useGetBlogQuery({
    notifyOnNetworkStatusChange: true,
    variables: { blogId: typeof blogId === "string" ? parseInt(blogId) : undefined },
  });

  let parsedContent = "";
  let yamlData;
  if (blogData && !loading) {
    const { data, content } = matter(blogData.getBlog.blogData);
    yamlData = data;
    console.log("DATA *** : ", yamlData);
    parsedContent = content;
    parseMarkdownToHtml();
  } else if (!blogData && !loading) {
    parsedContent = "# Sorry! We don't have what you're looking for 😐.";
    parseMarkdownToHtml();
  } else if (error) {
    parsedContent = "# Sorry! We don't have what you're looking for 😐.";
    parseMarkdownToHtml();
  }

  async function parseMarkdownToHtml() {
    const file = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(parsedContent);
    setfinalHTML(String(file));
  }

  return (
    <>
      <Flex alignItems="center" textAlign="center" direction="column" mb={20}>
        <Box mb={20}>
          <Image src={yamlData?.cover_image}></Image>
          <Heading mt={10}>{yamlData?.title}</Heading>
        </Box>
      </Flex>
      <Layout variantType="regular">
        <Box
          mb={20}
          dangerouslySetInnerHTML={{ __html: finalHTML }}
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
        />
      </Layout>
    </>
  );
};

export default MdxRenderer;
