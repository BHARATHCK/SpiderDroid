import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, Link, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import router from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { withApolloClient } from "../utils/apollo-client";
import { toErrorMap } from "../utils/toErrorMap";

const Login = () => {
  const [login, { data, loading, error }] = useLoginMutation();

  return (
    <>
      <NavBar />
      <Layout variantType="regular">
        <Wrapper variant="small">
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({
                variables: values,
                update: (cache, { data }) => {
                  cache.evict({ fieldName: "posts:{}" });
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data.login.user,
                    },
                  });
                },
              });

              if (response.data.login.errors) {
                console.log(response.data.login.errors);
                setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data.login.user) {
                if (typeof router.query.next === "string") {
                  router.push(router.query.next);
                } else {
                  router.push("/");
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box m={4}>
                  <Box mt={4} minW={400}>
                    <InputField
                      helperText="Enter the user name or Email"
                      name="username"
                      label="UserName"
                      placeholder="Enter UserName or Email"
                    />
                  </Box>
                  <Box mt="4">
                    <InputField
                      helperText="Enter password"
                      name="password"
                      label="Password"
                      placeholder="password"
                      type="password"
                    />
                  </Box>

                  <Flex mt={2} alignItems="center">
                    <Button mt="4" colorScheme="red" isLoading={isSubmitting} type="submit">
                      Login
                    </Button>
                    <NextLink href="/forgot-password">
                      <Link ml="auto">Forgot Password?</Link>
                    </NextLink>
                  </Flex>
                </Box>
              </Form>
            )}
          </Formik>
          <Flex alignItems="center">
            <Divider /> <Text fontWeight={100}>OR</Text> <Divider />
          </Flex>
          <NextLink href="/register">
            <Button m="4" colorScheme="red" type="submit">
              Register
            </Button>
          </NextLink>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withApolloClient()(Login);
