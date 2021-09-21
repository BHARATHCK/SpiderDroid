import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { withApolloClient } from "../utils/apollo-client";
import Avatar from "react-avatar";
import { useLogOutMutation, useProfileQuery, useRatePostMutation } from "../generated/graphql";
import NavBar from "../components/NavBar";
import Layout from "../components/Layout";
import { Button } from "@chakra-ui/button";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/spinner";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import Rating from "../components/RatingComponent";

const profile = () => {
  const [bookingObject, setBookingObject] = useState({});

  const [logout, { loading: logoutLoading }] = useLogOutMutation({
    notifyOnNetworkStatusChange: true,
  });

  const [ratePost, { loading: ratingPostLoading }] = useRatePostMutation({
    notifyOnNetworkStatusChange: true,
  });
  const { data, loading } = useProfileQuery({
    notifyOnNetworkStatusChange: true,
  });
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
        <Flex direction="row" justifyContent="space-between" alignItems="center">
          <Box m={10}>
            {!data || loading ? (
              <Avatar name="Place Holder" size="150" round={false} />
            ) : (
              <Avatar name={data.me.username} size="150" round={false} />
            )}
          </Box>
          <Box>
            <Button m={10} isLoading={logoutLoading} onClick={handleLogout} colorScheme="red">
              Log Out
            </Button>
          </Box>
        </Flex>
        <Flex>
          {!data || loading ? (
            <Spinner
              m="auto"
              thickness="6px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <Box m="10px">
              <Tabs mt={10} variant="soft-rounded" colorScheme="green">
                <TabList>
                  <Tab>Bookings</Tab>
                  <Tab>Posts</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {data.me.bookings.map((booking) => (
                      <Stack mt={4} direction="row" minW="400px">
                        <Box boxShadow="lg" padding="10px">
                          <Flex direction="column">
                            <Box>
                              <Flex direction="row">
                                <Image
                                  width={30}
                                  height={30}
                                  src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632257775/car_s9lslv.png"
                                ></Image>
                                <Text ml={4}> Car ID : {booking.carId}</Text>
                              </Flex>
                            </Box>
                            <Box>
                              <Flex>
                                <Image
                                  width={30}
                                  height={30}
                                  src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632258476/booking_aturpk.png"
                                ></Image>
                                <Text ml={4}>Booking Status - {booking.bookingStatus}</Text>
                              </Flex>
                            </Box>
                            <Box>
                              <Flex>
                                <Image
                                  width={30}
                                  height={30}
                                  src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632258679/date_eg4qze.png"
                                ></Image>
                                <Text ml={4}>From - {booking.fromDate}</Text>
                              </Flex>
                            </Box>
                            <Box>
                              <Flex>
                                <Image
                                  width={30}
                                  height={30}
                                  src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632258679/date_eg4qze.png"
                                ></Image>
                                <Text ml={4}>Until - {booking.toDate}</Text>
                              </Flex>
                            </Box>
                            <Box>
                              <Flex justifyContent="space-between" alignItems="center">
                                <Image
                                  width={30}
                                  height={30}
                                  src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632258715/rating_l1tu3h.png"
                                ></Image>
                                <Text ml={4}>
                                  {booking.ratingStatus || (
                                    <Rating
                                      postId={booking.carId}
                                      bookingId={booking.id}
                                      fillColor="red"
                                      icon="Star"
                                      scale={5}
                                      strokeColor="black"
                                      size={30}
                                    />
                                  )}
                                </Text>
                              </Flex>
                            </Box>
                          </Flex>
                        </Box>
                      </Stack>
                    ))}
                  </TabPanel>
                  <TabPanel>
                    {data.me.posts.map((post) => (
                      <Stack direction="row" border="1px">
                        <Text>{post.id}</Text>
                        <Text>{post.carMake}</Text>
                        <Text>{post.carModel}</Text>
                        <Text>{post.carYear}</Text>
                      </Stack>
                    ))}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          )}
        </Flex>
      </Layout>
    </>
  );
};

export default withApolloClient()(profile);
