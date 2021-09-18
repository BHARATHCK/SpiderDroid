import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import router from "next/router";
import React from "react";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { withApolloClient } from "../utils/apollo-client";
import { toErrorMap } from "../utils/toErrorMap";
import NextLink from "next/link";

const Login = () => {
  const [login, { data, loading, error }] = useLoginMutation();

  return (
    <>
      <NavBar />
      <Layout variantType="regular">
        <Wrapper variant="small">
          <Formik
            initialValues={{ userNameOrEmail: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({
                variables: {
                  loginUsernameoremail: values.userNameOrEmail,
                  loginPassword: values.password,
                },
              });

              if (response.data.login.errors) {
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
                <Field
                  name="username"
                  render={({ field }) => (
                    <FormControl as="fieldset" isRequired={true}>
                      <FormLabel as="legend">Username</FormLabel>
                      <Input
                        type="username"
                        name="userNameOrEmail"
                        placeholder="UserName or Email Id"
                        {...field}
                      />
                      <Box color="red.500">
                        <ErrorMessage name="userNameOrEmail" />
                      </Box>
                      <FormHelperText>Username or EmailId</FormHelperText>
                    </FormControl>
                  )}
                />

                <Box mt="4">
                  <Field
                    name="password"
                    render={({ field }) => (
                      <FormControl as="fieldset" isRequired={true}>
                        <FormLabel as="legend">Password</FormLabel>
                        <Input type="password" name="password" placeholder="password" {...field} />
                        <ErrorMessage name="password" />
                        <FormHelperText>Password</FormHelperText>
                      </FormControl>
                    )}
                  />
                </Box>
                <Button mt="4" colorScheme="red" isLoading={isSubmitting} type="submit">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <Flex alignItems="center">
            <Divider /> <Text fontWeight={100}>OR</Text> <Divider />
          </Flex>
          <NextLink href="/register">
            <Button mt="4" colorScheme="red" type="submit">
              Register
            </Button>
          </NextLink>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withApolloClient()(Login);
