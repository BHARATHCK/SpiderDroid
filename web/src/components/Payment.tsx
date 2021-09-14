import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { PostQuery, RazorpayFields, useRazorpayPaymentMutation } from "../generated/graphql";

const loadScript = () => {
  return new Promise((resolve) => {
    // Load the razorpay script into dom
    const script = document.createElement("script");
    script.src = process.env.NEXT_PUBLIC_RAZORPAY_CHEKOUT_SDK;

    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };
  });
};

const MakePayment = async (serverPaymentOptions: RazorpayFields) => {
  const res = await loadScript();
  if (!res) {
    return <Box>Razorpay script failed to load !!</Box>;
  }

  let options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    amount: serverPaymentOptions.amount,
    currency: serverPaymentOptions.currency,
    name: process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_PAYMENT_DESCRIPTION,
    image: "https://i.ibb.co/n3R0LH6/Main-logo.png",
    order_id: serverPaymentOptions.id,
    handler: function (response) {
      // Handle verification using webhooks on express server.
    },
    theme: {
      color: "#3399cc",
    },
  };

  const _window = window as any;
  const paymentObject = new _window.Razorpay(options);
  paymentObject.open();

  return true;
};

interface PaymentProps {
  postData?: PostQuery;
  fromDate?: Date;
  toDate?: Date;
}

const PaymentButton: React.FC<PaymentProps> = ({ postData, fromDate, toDate }) => {
  const [renderError, setRenderError] = useState(null);
  const router = useRouter();

  const closePopUp = () => {
    setRenderError(false);
  };

  // fetch razorpay orderId
  const [startPayment, { data, loading, error }] = useRazorpayPaymentMutation({
    notifyOnNetworkStatusChange: true,
  });

  return (
    <>
      <Formik
        initialValues={{ username: "", email: "", password: "", role: "" }}
        onSubmit={async () => {
          const response = await startPayment({
            variables: {
              carId: postData.post.id,
              razorpaypaymentUserFromDate: fromDate,
              razorpaypaymentUserToDate: toDate,
            },
          });

          if (response.data.razorpaypayment.errors) {
            // Errors
            setRenderError(true);
          } else if (response.data.razorpaypayment.paymentResponse) {
            // Start making payment
            const res = await MakePayment(response.data.razorpaypayment.paymentResponse);
            router.push(`/verify-payment/${response.data.razorpaypayment.paymentResponse.id}`);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Button isLoading={isSubmitting} type="submit" colorScheme="red">
              Continue &bull; {postData.post.carCostPerDay}
            </Button>
          </Form>
        )}
      </Formik>
      {renderError ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Payment Not Completed!</AlertTitle>
          <AlertDescription>The car Id is not found please retry after sometime</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={closePopUp} />
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default PaymentButton;
