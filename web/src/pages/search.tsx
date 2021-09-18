import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import Layout from "../components/Layout";
import { withApolloClient } from "../utils/apollo-client";

const SearchPage = () => {
  const router = useRouter();

  console.log(router.query.fromDate);
  console.log(router.query.toDate);
  console.log(router.query.destination);

  return (
    <>
      <NavBar />
      <Layout variantType="regular"></Layout>
    </>
  );
};

export default withApolloClient()(SearchPage);
