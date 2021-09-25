import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { InputField } from "../../components/IndexPageComponents/InputField";
import { Wrapper } from "../../components/IndexPageComponents/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { withApolloClient } from "../../utils/apollo-client";
import { toErrorMap } from "../../utils/toErrorMap";

const ChangePassword: NextPage<{ token: string }> = () => {
  const [tokenErr, setTokenErr] = useState("");
  const router = useRouter();
  const [changePassword, { loading, data }] = useChangePasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ password: "" }}
        onSubmit={async (values, { setErrors }) => {
          let response = await changePassword({
            variables: {
              token: typeof router.query.id === "string" ? router.query.id : "",
              newPassword: values.password,
            },
          });
          if (response.data?.changePassword.errors) {
            let errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenErr(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {tokenErr ? (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Token Error</AlertTitle>
                <AlertDescription>{tokenErr}</AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            ) : null}
            <Box mt="4">
              <InputField
                helperText="Enter the new password"
                name="password"
                label="Password"
                placeholder="New Password"
                type="password"
              />
            </Box>
            <Button mt="4" colorScheme="teal" isLoading={isSubmitting} type="submit">
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApolloClient({ ssr: false })(ChangePassword);
