import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
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
                <Field
                  name="username"
                  render={({ field }) => (
                    <FormControl as="fieldset" isRequired={true}>
                      <FormLabel as="legend">Username</FormLabel>
                      <Input type="username" name="username" placeholder="username" {...field} />
                      <FormHelperText>Username</FormHelperText>
                    </FormControl>
                  )}
                />
                <Box mt={4}>
                  <Field
                    name="email"
                    render={({ field }) => (
                      <FormControl as="fieldset" isRequired={true}>
                        <FormLabel as="legend">Email Id</FormLabel>
                        <Input type="email" name="email" placeholder="email" {...field} />
                        <FormHelperText>Email Id</FormHelperText>
                      </FormControl>
                    )}
                  />
                </Box>

                <Box mt="4">
                  <Field
                    name="password"
                    render={({ field }) => (
                      <FormControl as="fieldset" isRequired={true}>
                        <FormLabel as="legend">Password</FormLabel>
                        <Input type="password" name="password" placeholder="password" {...field} />
                        <FormHelperText>Password</FormHelperText>
                      </FormControl>
                    )}
                  />
                </Box>
                <Box mt={4}>
                  <Field
                    name="role"
                    render={({ field }) => (
                      <FormControl as="fieldset" isRequired={true}>
                        <FormLabel as="legend">Role</FormLabel>
                        <RadioGroup defaultValue="browse" {...field}>
                          <HStack spacing="24px">
                            <Radio {...field} name="role" value="browse">
                              Browse
                            </Radio>
                            <Radio {...field} name="role" value="host">
                              Host
                            </Radio>
                          </HStack>
                        </RadioGroup>
                        <FormHelperText>
                          Choose the appropriate role [browse for renting the car and host for
                          hosting the car]
                        </FormHelperText>
                      </FormControl>
                    )}
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

export default withApolloClient()(Register);
