import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Grid } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import CarDisplayCard from "../components/CarDisplayCard";
import { InputField } from "../components/InputField";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import { useViewport } from "../components/ViewPortHook";
import { useFindCarsLazyQuery, useFindCarsQuery } from "../generated/graphql";
import { withApolloClient } from "../utils/apollo-client";

const findCars = () => {
  const { width } = useViewport();
  const breakpoint = 700;
  const breakPointTablet = 900;

  const [disableLoadMore, setDisableLoadMore] = useState(false);

  const { data, loading, fetchMore, refetch } = useFindCarsQuery({
    variables: { findCarsLimit: 10, findCarsSkipVariable: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const [filterCars, { data: lazyData, loading: lazyLoading }] = useFindCarsLazyQuery({
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    console.log("UseEffect :: ");
    console.log(data?.findCars?.posts.length);
    if (data?.findCars?.posts.length < 10) {
      console.log("UseEffect :: ");
      setDisableLoadMore(true);
    }
  }, [data?.findCars?.posts]);

  return (
    <>
      <NavBar />
      <Layout variantType="regular">
        {/* FILTER MENU */}

        <Box minWidth="100%" maxW="700px" boxShadow="lg" mt={10} mb={10}>
          <Formik
            initialValues={{ carmake: "", caryear: "", carmodel: "" }}
            onSubmit={(values, { setErrors }) => {
              console.log("FORM SUBMITTED ***************** ");
              refetch({
                carMake: values.carmake,
                carYear: values.caryear,
                carModel: values.carmodel,
                findCarsLimit: 10,
                findCarsSkipVariable: 0,
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Flex alignItems="center" m={5} direction="row">
                  <Image
                    src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632495180/filter_zxl08n.png"
                    width="30px"
                    height="30px"
                    mr={10}
                  />
                  <InputField
                    helperText=""
                    name="carmake"
                    label=""
                    placeholder="Car Make"
                    explicitWidth={200}
                  />
                  <InputField
                    helperText=""
                    name="carmodel"
                    label=""
                    placeholder="Car Model"
                    explicitWidth={200}
                  />
                  <InputField
                    helperText=""
                    name="caryear"
                    label=""
                    placeholder="Car Year"
                    explicitWidth={200}
                  />
                  <Button width="300px" colorScheme="red" type="submit">
                    Apply filter
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>

        {/* FILTER MENU END */}
        <Box>
          {!data || loading ? (
            <Box textAlign="center">
              <Spinner
                m="auto"
                thickness="6px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Box>
          ) : (
            <Grid
              templateColumns={`repeat( ${width < breakpoint ? 2 : 3}, 1fr)`}
              gap={6}
              m={width < breakpoint ? 2 : width < breakPointTablet ? 4 : 0}
            >
              {data.findCars.posts.map((post) => (
                <CarDisplayCard post={post} />
              ))}
            </Grid>
          )}
          <Flex alignItems="center" justifyContent="center">
            <Button
              isDisabled={disableLoadMore}
              isLoading={loading}
              m="10"
              colorScheme="red"
              onClick={async () => {
                await fetchMore({
                  variables: {
                    findCarsSkipVariable: data.findCars.posts.length + 10,
                  },
                });
              }}
            >
              Load More
            </Button>
          </Flex>
        </Box>
      </Layout>
    </>
  );
};

export default withApolloClient()(findCars);
