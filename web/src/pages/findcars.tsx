import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Grid } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import CarDisplayCard from "../components/InteractiveComponents/CarDisplayCard";
import { InputField } from "../components/IndexPageComponents/InputField";
import Layout from "../components/IndexPageComponents/Layout";
import NavBar from "../components/IndexPageComponents/NavBar";
import { useViewport } from "../components/InteractiveComponents/ViewPortHook";
import { Exact, useFindCarsLazyQuery, useFindCarsQuery } from "../generated/graphql";
import { withApolloClient } from "../utils/apollo-client";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  ResponsiveValue,
} from "@chakra-ui/react";

const findCars = () => {
  const { width } = useViewport();
  const breakpoint = 700;
  const breakPointTablet = 900;

  const { isOpen, onOpen, onClose } = useDisclosure();

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
        {width < breakpoint ? (
          <Box>
            <Flex alignItems="center" justifyContent="center">
              <Button colorScheme="blue" variant="outline" onClick={onOpen}>
                Filters
              </Button>
            </Flex>
          </Box>
        ) : (
          ""
        )}

        {/* Filter Menu Mobile START*/}

        <Drawer isOpen={isOpen} onClose={onClose} size="full">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search</DrawerHeader>
            <DrawerBody>{formikFilterMenu(refetch, "column", onClose)}</DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* FILTER MENU MOBILE END */}

        {/* FILTER MENU Destop*/}

        <Box
          minWidth="100%"
          maxW="700px"
          boxShadow="lg"
          mt={10}
          mb={10}
          display={width < breakpoint ? "none" : undefined}
        >
          {formikFilterMenu(refetch, "row", undefined)}
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

const formikFilterMenu = (refetch: any, direction: ResponsiveValue<any>, onClose: any) => {
  return (
    <Formik
      initialValues={{ carmake: "", caryear: "", carmodel: "" }}
      onSubmit={(values, { setErrors }) => {
        refetch({
          carMake: values.carmake,
          carYear: values.caryear,
          carModel: values.carmodel,
          findCarsLimit: 10,
          findCarsSkipVariable: 0,
        });

        onClose();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex alignItems="center" m={5} direction={direction} justifyContent="center">
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
              explicitWidth={direction == "column" ? undefined : 200}
            />
            <InputField
              helperText=""
              name="carmodel"
              label=""
              placeholder="Car Model"
              explicitWidth={direction == "column" ? undefined : 200}
            />
            <InputField
              helperText=""
              name="caryear"
              label=""
              placeholder="Car Year"
              explicitWidth={direction == "column" ? undefined : 200}
            />
            <Button width="300px" colorScheme="red" type="submit">
              Apply filter
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default withApolloClient()(findCars);
