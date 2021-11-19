import { Box, Flex, Text } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/IndexPageComponents/Layout";
import { usePaymentStatusQuery } from "../../generated/graphql";
import { withApolloClient } from "../../utils/apollo-client";

const PaymentCompleted = () => {
  const router = useRouter();

  if (!router.isReady) {
    return <div>Checking ...</div>;
  }

  const { id } = router.query;

  //keep polling to check if orderId is verified in the DB
  const { data, loading, stopPolling } = usePaymentStatusQuery({
    variables: { orderId: typeof id === "string" ? id : "" },
    pollInterval: parseInt(process.env.NEXT_PUBLIC_POLLING_INTERVAL),
    notifyOnNetworkStatusChange: true,
  });

  // Start Timer
  useEffect(() => {
    setTimeout(() => {
      stopPolling();
      router.push("/?toast=fail");
    }, 60000);
  }, []);

  useEffect(() => {
    if (data?.paymentstatus?.status) {
      stopPolling();
      router.push("/?toast=success");
    }
  }, [data]);

  return (
    <Layout variantType="regular">
      <Flex alignItems="center">
        <Text>The Transaction is being verified.</Text>
        <Text>You will be redirected once verified. Do not refresh</Text>
        <Box>
          <Progress size="md" isIndeterminate />
        </Box>
      </Flex>
    </Layout>
  );
};

export default withApolloClient()(PaymentCompleted);
