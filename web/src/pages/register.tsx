import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/InputField";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
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
            initialValues={{ username: "", email: "", password: "", role: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({
                variables: { registerOptions: values },
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
                <InputField name="username" label="username" placeholder="Enter the username" />
                <Box mt={4}>
                  <InputField name="email" label="email" placeholder="Enter the Email" />
                </Box>

                <Box mt="4">
                  <InputField
                    name="password"
                    label="Password"
                    placeholder="password"
                    type="password"
                  />
                </Box>
                <Box mt={4}>
                  <InputField name="role" label="role" placeholder="Enter the Role" />
                </Box>
                <Button mt="4" colorScheme="teal" isLoading={isSubmitting} type="submit">
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
