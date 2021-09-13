import { Button } from "@chakra-ui/button";
import { StarIcon } from "@chakra-ui/icons";
import { Img } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import { useRouter } from "next/router";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import styles from "../../components/Carousel.module.css";
import Carouselize from "../../components/Carouselize";
import Layout from "../../components/Layout";
import NavBar from "../../components/NavBar";
import PaymentButton from "../../components/Payment";
import MakePayment from "../../components/Payment";
import { usePostQuery } from "../../generated/graphql";

const RentCar = () => {
  const [userDateFrom, setUserDateFrom] = useState(new Date());
  const [userDateTo, setUserDateTo] = useState(new Date());
  const router = useRouter();

  const { id } = router.query;

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
                  <DateTimePicker onChange={setUserDateFrom} value={userDateFrom} />
                </Box>
                <Spacer />
                <Box mt={10}>
                  <Text mb={2}>Trip End</Text>
                  <DateTimePicker onChange={setUserDateTo} value={userDateTo} />
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
                  <PaymentButton postData={data} />
                </Box>
              </Flex>
            </Box>
          </Stack>
        )}
      </Layout>
    </>
  );
};

export default RentCar;
