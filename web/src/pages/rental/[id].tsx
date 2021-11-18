import { StarIcon } from "@chakra-ui/icons";
import Image from "next/image";
import {
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styles from "../../components/Carousel/Carousel.module.css";
import Carouselize from "../../components/Carousel/Carouselize";
import Layout from "../../components/IndexPageComponents/Layout";
import NavBar from "../../components/IndexPageComponents/NavBar";
import PaymentButton from "../../components/RentalComponents/Payment";
import { useGetReviewsQuery, usePostQuery } from "../../generated/graphql";
import { withApolloClient } from "../../utils/apollo-client";
import isAuth from "../../utils/isAuth";
import { Avatar } from "@chakra-ui/avatar";
import { useViewport } from "../../components/InteractiveComponents/ViewPortHook";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";

const RentCar = () => {
  const router = useRouter();
  const { width } = useViewport();
  const breakpoint = 700;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Check for authentication
  isAuth("?next=" + router.asPath);

  // From Date
  let minFromDay = new Date();
  minFromDay.setDate(minFromDay.getDate() + 1);
  let maxFromDay = new Date();
  maxFromDay.setDate(maxFromDay.getDate() + 7);

  // Set state for fromDate
  const [fromDate, setFromDate] = useState(minFromDay);

  // To Date
  let minToDay = new Date();
  minToDay.setDate(fromDate.getDate() + 1);
  let maxToDay = new Date();
  maxToDay.setDate(fromDate.getDate() + 7);

  // Set State for toDate
  const [toDate, setToDate] = useState(minToDay);

  const handleFromDateChange = (fromDate) => setFromDate(fromDate);
  const handleToDateChange = (toDate) => setToDate(toDate);

  useEffect(() => {
    setToDate(minToDay);
  }, [fromDate]);

  const { id } = router.query;

  const { data, loading, error } = usePostQuery({
    variables: { postId: parseInt(typeof id === "string" ? id : "") },
    notifyOnNetworkStatusChange: true,
  });

  const { data: reviewsData, loading: loadingReviews } = useGetReviewsQuery({
    notifyOnNetworkStatusChange: true,
    variables: { carId: parseInt(typeof id === "string" ? id : "") },
  });

  // Exclude DateRange
  let excludeDateRange;
  if (data) {
    excludeDateRange = data.post.bookings.reduce(
      (accumulator, booking) => {
        return [
          accumulator[0] < new Date(parseInt(booking.fromDate))
            ? accumulator
            : new Date(parseInt(booking.fromDate)),
          accumulator[1] > new Date(parseInt(booking.toDate))
            ? accumulator
            : new Date(parseInt(booking.toDate)),
        ];
      },
      [new Date(), new Date()],
    );
  }

  if (error) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <NavBar />
      {data && !loading ? (
        <Carouselize
          source="rental"
          children={data.post.imageUrl.map((image, index) => (
            <div
              className={styles.embla__slide}
              key={index}
              style={{ width: "100%", paddingBottom: "20%", height: "900px" }}
            >
              <Image src={image} layout="fill" objectFit="contain" />
            </div>
          ))}
        />
      ) : (
        ""
      )}
      <Layout variantType="regular">
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
          <Stack direction={["column", "row"]} spacing="24px" mt={10} ml={4} mr={4} mb={20}>
            <Box minW="60%">
              <Heading>
                {data.post.carMake} &bull; {data.post.carModel} &bull; {data.post.carYear}
              </Heading>
              <Box>
                <Flex direction="column">
                  <Flex alignItems="center">
                    <Box>{data.post.points}</Box>
                    <StarIcon color="blue.600" />
                  </Flex>
                  <Badge mt={2} maxW={100} colorScheme="green">
                    {data.post.trips} Trips
                  </Badge>
                  <Box maxW="80%" mt={4}>
                    <Flex>
                      <Flex alignItems="center">
                        <Image
                          width={30}
                          height={30}
                          layout="fixed"
                          src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632150122/icons8-car-door-48_fhq6e5.png"
                        ></Image>
                        <Text ml={4}>{data.post.carDetails.doors} Doors</Text>
                      </Flex>
                      <Spacer />
                      <Flex alignItems="center">
                        <Image
                          width={30}
                          height={30}
                          layout="fixed"
                          src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632150169/icons8-car-seat-100_a6vtaa.png"
                        ></Image>
                        <Text ml={4}>{data.post.carDetails.seats} Seats</Text>
                      </Flex>
                    </Flex>
                  </Box>
                  <Box maxW="80%" mt={10}>
                    <Text fontWeight={600}>HOSTED BY</Text>
                    <NextLink href={`/host/` + data.post.creator.username}>
                      <Box cursor="pointer">
                        <Flex direction="row" justifyContent="left" alignItems="center" mt={4}>
                          <Avatar
                            name={data.post.creator.username}
                            width={90}
                            height={90}
                            round={true}
                          />
                          <Flex direction="column">
                            <Text ml={4}>{data.post.creator.username}</Text>
                            <Text ml={4}>{data.post.creator.createdAt.slice(0, 10)}</Text>
                          </Flex>
                        </Flex>
                      </Box>
                    </NextLink>
                    <Flex mt={4}>
                      {width < breakpoint ? (
                        <Image
                          src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632142634/icons8-cleaning-58_jp4ojf.png"
                          width={60}
                          height={60}
                          layout="fixed"
                        ></Image>
                      ) : (
                        <Image
                          src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632142634/icons8-cleaning-58_jp4ojf.png"
                          width={60}
                          height={60}
                          layout="fixed"
                        ></Image>
                      )}

                      <Text ml={4}>
                        {data.post.creator.username} has completed training on enhanced cleaning and
                        disinfection practices.
                        <br></br>
                        <Link
                          onClick={onOpen}
                          color="blue"
                          textDecorationLine="underline"
                          colorScheme="blue"
                        >
                          Learn more
                        </Link>
                      </Text>
                    </Flex>
                  </Box>

                  {/* Modal */}

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Cleaning &amp; disinfection training</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Image
                          width={490}
                          height={200}
                          src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632151329/disinfectTraining_uqoffc.png"
                        ></Image>
                        <Text>
                          This host has completed training on enhanced cleaning and disinfection
                          practices that use the latest recommendations compiled from the CDC, EPA,
                          WHO, and vehicle detailing experts.
                        </Text>
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>

                  <Box mt={10}>
                    <Flex direction="column">
                      <Text fontWeight={600}>DESCRIPTION</Text>
                      <Text>{data.post.carDetails.description}</Text>
                    </Flex>
                  </Box>
                  <Box mt={10}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <Flex alignItems="center">
                        <Image
                          width={30}
                          height={30}
                          src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632148394/icons8-fuel-60_lr363a.png"
                        ></Image>
                        <Box ml={2}>{data.post.carDetails.fuelType}</Box>
                      </Flex>
                      <Flex alignItems="center">
                        <Image
                          width={30}
                          height={30}
                          src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632148699/icons8-aux-cable-64_dw03s9.png"
                        ></Image>
                        <Box ml={2}>{data.post.carDetails.mediaSystem}</Box>
                      </Flex>
                      <Flex alignItems="center">
                        <Image
                          width={30}
                          height={30}
                          src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632148750/icons8-gas-bottle-48_l6vzri.png"
                        ></Image>
                        <Box ml={2}>{data.post.carDetails.mileage} Mileage</Box>
                      </Flex>
                      <Flex alignItems="center">
                        <Image
                          width={30}
                          height={30}
                          src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632148869/icons8-pet-64_jzexwy.png"
                        ></Image>
                        <Box ml={2}>
                          {data.post.carDetails.petSituation || <Box>No pets Pls!</Box>}
                        </Box>
                      </Flex>
                      <Flex alignItems="center">
                        <Image
                          width={30}
                          height={30}
                          src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632148893/icons8-gear-64_bjl7xi.png"
                        ></Image>
                        <Box ml={2}>{data.post.carDetails.transmission}</Box>
                      </Flex>
                      <Flex alignItems="center">
                        <Image
                          width={30}
                          height={30}
                          src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632148914/icons8-dictionary-48_a8nzex.png"
                        ></Image>
                        <Box ml={2}>{data.post.carDetails.condition}</Box>
                      </Flex>
                    </Grid>
                  </Box>
                </Flex>
              </Box>
            </Box>
            <Box minW="40%">
              <Flex direction="column">
                <Box>
                  <Text fontWeight="bold">&#8377; {data.post.carCostPerDay} /Day</Text>
                </Box>
                <Divider m={5} />
                <Box>
                  <Text mb={2}>Trip Start</Text>
                  <Box border="1px">
                    <DatePicker
                      minDate={minFromDay}
                      maxDate={maxFromDay}
                      selected={fromDate}
                      onChange={handleFromDateChange}
                      showTimeSelect
                      excludeDates={excludeDateRange}
                    />
                  </Box>
                </Box>
                <Spacer />
                <Box mt={10}>
                  <Text mb={2}>Trip End</Text>
                  <Box border="1px">
                    <DatePicker
                      minDate={minToDay}
                      maxDate={maxToDay}
                      excludeDates={excludeDateRange}
                      selected={toDate}
                      onChange={handleToDateChange}
                      showTimeSelect
                    />
                  </Box>
                </Box>
                <Box mt={10}>
                  <Text>PickUp &amp; Return Location</Text>
                  <Select
                    placeholder="Select option"
                    defaultValue={data.post.destination.destinationName}
                  >
                    <option value={data.post.destination.destinationName}>
                      {data.post.destination.destinationName}
                    </option>
                  </Select>
                </Box>
                <Box mt={10} minW="70%">
                  <PaymentButton postData={data} fromDate={fromDate} toDate={toDate} />
                </Box>
              </Flex>
            </Box>
          </Stack>
        )}
        {!reviewsData || loadingReviews ? (
          <Spinner
            m="auto"
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <>
            <Heading fontWeight={600}>Reviews</Heading>
            <Stack spacing={8} mb={200} mt={10}>
              {reviewsData.experienceReviews.map((review) => (
                <Feature title={review.commentTitle} desc={review.commentText} />
              ))}
            </Stack>
          </>
        )}
      </Layout>
    </>
  );
};

function Feature({ title, desc, ...rest }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
}

export default withApolloClient()(RentCar);
