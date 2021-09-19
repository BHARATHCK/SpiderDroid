import { Box } from "@chakra-ui/layout";
import { withApolloClient } from "../utils/apollo-client";
import Avatar from "react-avatar";
import { useLogOutMutation, useMeQuery } from "../generated/graphql";
import NavBar from "../components/NavBar";
import Layout from "../components/Layout";
import { Button } from "@chakra-ui/button";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

const profile = () => {
  const [logout, { loading: logoutLoading }] = useLogOutMutation({
    notifyOnNetworkStatusChange: true,
  });
  const { data, loading } = useMeQuery();
  const apolloClient = useApolloClient();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    apolloClient.resetStore();
    router.push("/");
  };

  return (
    <>
      <NavBar />
      <Layout variantType="regular">
        <Box>
          {!data || loading ? (
            <Avatar name="Place Holder" size="150" round={false} />
          ) : (
            <Avatar name={data.me.username} size="150" round={false} />
          )}
        </Box>
        <Box>
          <Button isLoading={logoutLoading} onClick={handleLogout} colorScheme="red">
            Log Out
          </Button>
        </Box>
      </Layout>
    </>
  );
};

export default withApolloClient()(profile);
