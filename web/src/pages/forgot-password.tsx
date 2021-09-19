import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withApolloClient } from "../utils/apollo-client";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: values });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box m={4}>
              If an account exists with the provided email, we have sent a password reset link.
            </Box>
          ) : (
            <Form>
              <Box m={4}>
                <InputField
                  textarea={false}
                  name="email"
                  label="Email"
                  placeholder="Enter the Email"
                />
                <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                  Confirm
                </Button>
              </Box>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withApolloClient({ ssr: false })(ForgotPassword);
