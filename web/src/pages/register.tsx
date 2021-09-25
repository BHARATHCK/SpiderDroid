import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/IndexPageComponents/InputField";
import Layout from "../components/IndexPageComponents/Layout";
import NavBar from "../components/IndexPageComponents/NavBar";
import { Wrapper } from "../components/IndexPageComponents/Wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { withApolloClient } from "../utils/apollo-client";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register, { loading, error }] = useRegisterMutation({ notifyOnNetworkStatusChange: true });
  return (
    <>
      <NavBar />
      <Layout variantType="regular">
        <Wrapper variant="small">
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({
                variables: { registerOptions: values },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data.register.user,
                    },
                  });
                },
              });

              if (response.data.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
              } else if (response.data.register.user) {
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  helperText="Enter UserName"
                  name="username"
                  label="username"
                  placeholder="Enter the username"
                />
                <Box mt={4}>
                  <InputField
                    helperText="Enter Email"
                    name="email"
                    label="email"
                    placeholder="Enter the Email"
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
                <Button mt="4" colorScheme="red" isLoading={isSubmitting} type="submit">
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withApolloClient()(Register);
