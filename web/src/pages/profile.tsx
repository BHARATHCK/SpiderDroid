import { Box } from "@chakra-ui/layout";
import { withApolloClient } from "../utils/apollo-client";
import Avatar from "react-avatar";
import { useMeQuery } from "../generated/graphql";
import NavBar from "../components/NavBar";
import Layout from "../components/Layout";

const profile = () => {
  const { data, loading } = useMeQuery();
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
      </Layout>
    </>
  );
};

export default withApolloClient()(profile);
