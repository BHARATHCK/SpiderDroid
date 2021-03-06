import { Box, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/layout";
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
import NextLink from "next/link";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

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
    setCommentText("");
    setCommentTitle("");
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
            <Button ml={10} isLoading={logoutLoading} onClick={handleLogout} colorScheme="red">
              Log Out
            </Button>
            <NextLink href="/createTravelogue">
              <Button m={10} colorScheme="red">
                Create Travelogue
              </Button>
            </NextLink>
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
                    <Grid mt={4} templateColumns="repeat(3, 1fr)" gap={6}>
                      {data.me.bookings.map((booking) => (
                        <Box boxShadow="lg" padding="10px" minW="300px" maxW="300px">
                          <Flex direction="column">
                            <Box>
                              <Flex direction="row">
                                <Image
                                  width={30}
                                  height={30}
                                  src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632257775/car_s9lslv.png"
                                ></Image>
                                <Text ml={4}>
                                  {" "}
                                  Car : {booking.post?.carMake} [{booking.post?.carModel}]
                                </Text>
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
                                <Text ml={4}>From - {booking.fromDate.split("T")[0]}</Text>
                              </Flex>
                            </Box>
                            <Box>
                              <Flex>
                                <Image
                                  width={30}
                                  height={30}
                                  src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632258679/date_eg4qze.png"
                                ></Image>
                                <Text ml={4}>Until - {booking.toDate.split("T")[0]}</Text>
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
                                    <Box width={30} height={30}>
                                      <Image
                                        width={30}
                                        height={30}
                                        layout="fixed"
                                        src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632258715/rating_l1tu3h.png"
                                      ></Image>
                                    </Box>
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
                      ))}
                    </Grid>
                  </TabPanel>
                  <TabPanel>
                    <Grid mt={4} templateColumns="repeat(3, 1fr)" gap={6}>
                      {data.me.posts.map((post) => (
                        <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
                          <Image
                            width={250}
                            height={200}
                            layout="responsive"
                            src={post.imageUrl[0]}
                            alt={"no image"}
                          />

                          <Box p="6">
                            <Box
                              mt="1"
                              fontWeight="semibold"
                              as="h4"
                              lineHeight="tight"
                              isTruncated
                            >
                              {post.carMake} &bull; {post.carModel} &bull; {post.carYear}
                            </Box>
                          </Box>
                          <Box p="6">
                            <IconButton
                              colorScheme="red"
                              aria-label="Delete Post"
                              icon={<DeleteIcon />}
                            />
                            <IconButton
                              onClick={() => router.push(`/edit-post/${post.id}`)}
                              ml={5}
                              colorScheme="red"
                              aria-label="Edit Post"
                              icon={<EditIcon />}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Grid>
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
