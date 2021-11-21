import NavBar from "../../components/IndexPageComponents/NavBar";
import Layout from "../../components/IndexPageComponents/Layout";
import MdxRenderer from "../../components/InteractiveComponents/MdxRenderer";
import { withApolloClient } from "../../utils/apollo-client";
import { useRouter } from "next/router";

const renderBlog = () => {
  const router = useRouter();
  return (
    <>
      <NavBar />
      <MdxRenderer blogId={router.query.id} />
    </>
  );
};

export default withApolloClient()(renderBlog);
