import { withApolloClient } from "../utils/apollo-client";

const Category = () => {
  return <div>Hello from Category !!</div>;
};

export default withApolloClient()(Category);
