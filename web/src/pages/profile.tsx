import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { withApolloClient } from "../utils/apollo-client";
import Avatar from "react-avatar";
import {
  useAddReviewMutation,
  useLogOutMutation,
  useProfileQuery,
  useRatePostMutation,
} from "../generated/graphql";
import NavBar from "../components/IndexPageComponents/NavBar";
import Layout from "../components/IndexPageComponents/Layout";
import { Button } from "@chakra-ui/button";
import { Cache, useApolloClient } from "@apollo/client";
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
  Textarea,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Rating from "../components/InteractiveComponents/RatingComponent";
import { useViewport } from "../components/InteractiveComponents/ViewPortHook";

const profile = () => {
  const { width } = useViewport();
  const breakpoint = 700;
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [commentText, setCommentText] = React.useState("");
  let [commentTitle, setCommentTitle] = React.useState("");
  let [currBookingId, setCurrBookingId] = React.useState(0);

  const [addReview, { loading: updatingReview }] = useAddReviewMutation({
    notifyOnNetworkStatusChange: true,
  });

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

  useEffect(() => {
    if (commentText.length >= 100) {
      setCommentText(commentText.slice(0, 100));
    }
  }, [commentText]);

  useEffect(() => {
    if (commentTitle.length >= 50) {
      console.log("SET TITLE TO 50 Chars");
      setCommentTitle(commentTitle.slice(0, 50));
    }
  }, [commentTitle]);

  const handleLogout = async () => {
    await logout();
    apolloClient.resetStore();
    router.push("/");
  };

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setCommentText(inputValue);
  };

  const handleTitleChange = (e) => {
    let titleValue = e.target.value;
    setCommentTitle(titleValue);
  };

  const handleClose = async () => {
    await addReview({
      variables: {
        addReviewBookingId: currBookingId,
        addReviewCommentText: commentText,
        addReviewCommentTitle: commentTitle,
      },
      update: (cache) => {
        console.log("Evicting cache : ", cache);
        cache.evict({ fieldName: "me" });
      },
    });

    onClose();
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
                                {booking.ratingStatus ? (
                                  ""
                                ) : (
                                  <Image
                                    width={30}
                                    height={30}
                                    src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632258715/rating_l1tu3h.png"
                                  ></Image>
                                )}
                                <Text ml={4}>
                                  {booking.ratingStatus ? (
                                    ""
                                  ) : (
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
                            <Box>
                              <Flex justifyContent="space-between" alignItems="center">
                                {booking!.comment[0] ? (
                                  <Flex>
                                    <Image
                                      width={30}
                                      height={30}
                                      layout="fixed"
                                      src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632258715/rating_l1tu3h.png"
                                    ></Image>
                                    <Text maxW={width < breakpoint ? width - 150 : ""} ml={4}>
                                      {booking.comment[0].commentText}
                                    </Text>
                                  </Flex>
                                ) : (
                                  <Text
                                    color="blue"
                                    textDecoration="underline"
                                    cursor="pointer"
                                    onClick={() => {
                                      setCurrBookingId(booking.id);
                                      onOpen();
                                    }}
                                  >
                                    Click here to add a review
                                  </Text>
                                )}
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
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Textarea
                  value={commentTitle}
                  onChange={handleTitleChange}
                  placeholder="Type in your review.."
                />
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Textarea
                  value={commentText}
                  onChange={handleInputChange}
                  placeholder="Type in your review.."
                />
              </ModalBody>

              <ModalFooter>
                <Flex direction="row">
                  <Button colorScheme="red" mr={3} onClick={handleClose} isLoading={updatingReview}>
                    Submit
                  </Button>
                  <Button colorScheme="red" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </Flex>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </Layout>
    </>
  );
};

export default withApolloClient()(profile);
