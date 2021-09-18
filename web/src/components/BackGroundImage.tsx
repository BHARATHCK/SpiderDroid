import { IconButton } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Divider, Flex, Stack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import backgroundImage from "../../assets/backgroundImage.jpg";
import { useDestinationsQuery } from "../generated/graphql";
import { useViewport } from "./ViewPortHook";
import NextLink from "next/link";

const BackGroundImage = () => {
  const { data, loading } = useDestinationsQuery();

  const { width } = useViewport();
  const breakpoint = 700;

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

  return (
    <>
      <Box
        zIndex={1000}
        pos="absolute"
        mt={10}
        left={width < breakpoint ? "22%" : "30%"}
        backgroundColor="white"
        borderRadius={8}
      >
        <Flex direction={width < breakpoint ? "column" : "row"}>
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
            <Select
              placeholder="Where ?"
              backgroundColor="white"
              borderRadius={width < breakpoint ? 8 : 0}
              borderLeftRadius={8}
            >
              {data.browseByDestination.map((destination) => (
                <option value={destination.id}>{destination.destinationName}</option>
              ))}
            </Select>
          )}

          <Box>
            <DatePicker
              minDate={minFromDay}
              maxDate={maxFromDay}
              selected={fromDate}
              onChange={handleFromDateChange}
              showTimeSelect
            />
          </Box>
          {width < breakpoint ? (
            ""
          ) : (
            <Box backgroundColor="white">
              <Stack direction="row" h="40px" p={2}>
                <Divider orientation="vertical" />
              </Stack>
            </Box>
          )}

          <Box>
            <DatePicker
              minDate={minToDay}
              maxDate={maxToDay}
              selected={toDate}
              onChange={handleToDateChange}
              showTimeSelect
            />
          </Box>
          <NextLink href="/search">
            <IconButton
              borderRadius={width < breakpoint ? 8 : 0}
              borderRightRadius={8}
              aria-label="Search database"
              icon={<SearchIcon />}
            />
          </NextLink>
        </Flex>
      </Box>
      <Box zIndex={-1000}>
        <Image
          height={width < breakpoint ? "800px" : ""}
          layout="responsive"
          src={backgroundImage}
        ></Image>
      </Box>
    </>
  );
};

export default BackGroundImage;
