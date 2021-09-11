import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/InputField";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  return (
    <>
      <NavBar />
      <Layout variantType="regular">
        <Wrapper variant="small">
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={() => {
              console.log("SUBMITTED");
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

export default Register;
