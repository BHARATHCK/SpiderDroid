/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

const isAuth = (nextRoute: string | null) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.me) {
      if (nextRoute) {
        router.replace("/login" + nextRoute);
      } else {
        router.replace("/login");
      }
    }
  }, [data, loading]);
};

export default isAuth;
