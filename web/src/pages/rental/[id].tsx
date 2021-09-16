import { StarIcon } from "@chakra-ui/icons";
import { Img } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styles from "../../components/Carousel.module.css";
import Carouselize from "../../components/Carouselize";
import Layout from "../../components/Layout";
import NavBar from "../../components/NavBar";
import PaymentButton from "../../components/Payment";
import { usePostQuery } from "../../generated/graphql";
import { withApolloClient } from "../../utils/apollo-client";

const RentCar = () => {
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

  const router = useRouter();

  console.log("FROM DATE : " + fromDate);
  console.log("To DATE : " + toDate);

  const { id } = router.query;

  console.log("ID::::::::: ", id);

  const { data, loading, error } = usePostQuery({
    variables: { postId: parseInt(typeof id === "string" ? id : "") },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <NavBar />
      {data ? (
        <Box>
          <Carouselize
            children={data.post.imageUrl.map((image, index) => (
              <div className={styles.embla__slide} key={index}>
                <Img src={image} />
              </div>
            ))}
          />
        </Box>
      ) : (
        ""
      )}
      <Layout variantType="regular">
        {!data && loading ? (
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
          <Stack direction={["column", "row"]} spacing="24px" mt={10}>
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
                  <Box maxW="80%">
                    <Flex>
                      <Text>Mileage</Text>
                      <Spacer />
                      <Text>Gas</Text>
                    </Flex>
                    <Flex>
                      <Text>4 doors</Text>
                      <Spacer />
                      <Text>4 seats</Text>
                    </Flex>
                  </Box>
                  <Box maxW="80%">
                    <Text>Hosted By</Text>
                    <Flex>
                      <Text>Profile PIC</Text>
                      <Spacer />
                      <Text>{data.post.creator.username}</Text>
                    </Flex>
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
      </Layout>
    </>
  );
};

export default withApolloClient()(RentCar);
