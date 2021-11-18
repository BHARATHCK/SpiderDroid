import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, Link, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import router from "next/router";
import React from "react";
import { InputField } from "../components/IndexPageComponents/InputField";
import Layout from "../components/IndexPageComponents/Layout";
import NavBar from "../components/IndexPageComponents/NavBar";
import { Wrapper } from "../components/IndexPageComponents/Wrapper";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { withApolloClient } from "../utils/apollo-client";
import { toErrorMap } from "../utils/toErrorMap";

const Login = () => {
  const [login, { data, loading, error }] = useLoginMutation();
  let guestLogin = false;
  let doGuestLogin = () => {
    guestLogin = true;
  };

  return (
    <>
      <NavBar />
      <Layout variantType="regular">
        <Wrapper variant="small">
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              if (guestLogin) {
                values = {
                  username: process.env.NEXT_PUBLIC_GUEST_USER_NAME,
                  password: process.env.NEXT_PUBLIC_GUEST_PASSWORD,
                };
              }

              const response = await login({
                variables: values,
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data.login.user,
                    },
                  });
                },
              });
              // Make guest login false
              guestLogin = false;

              if (response.data.login.errors) {
                console.log(response.data.login.errors);
                setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data.login.user) {
                if (typeof router.query.next === "string") {
                  console.log("ROUTER OBJECT ******** : ", router.query);
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
                    <Button
                      mt="4"
                      ml="6"
                      colorScheme="red"
                      isLoading={isSubmitting}
                      type="submit"
                      onClick={() => doGuestLogin()}
                    >
                      Guest Login
                    </Button>
                  </Flex>
                </Box>
              </Form>
            )}
          </Formik>
          <Flex alignItems="center">
            <Divider /> <Text fontWeight={100}>OR</Text> <Divider />
          </Flex>
          <Flex alignItems="center">
            <NextLink href="/register">
              <Button m="4" colorScheme="red" type="submit">
                Register
              </Button>
            </NextLink>
            <NextLink href="/forgot-password">
              <Link ml="auto">Forgot Password?</Link>
            </NextLink>
          </Flex>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withApolloClient()(Login);
