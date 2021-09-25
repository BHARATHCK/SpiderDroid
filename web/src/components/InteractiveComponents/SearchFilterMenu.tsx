import { IconButton } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Stack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/spinner";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDestinationsQuery } from "../../generated/graphql";
import { useViewport } from "./ViewPortHook";

const SearchFilterMenu = () => {
  const router = useRouter();
  const { data, loading } = useDestinationsQuery();
  const [dest, setDest] = useState("");
  const [selectError, setSelectError] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (dest === "" && search) {
      setSelectError(true);
    } else {
      setSelectError(false);
    }
  }, [dest, search]);

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
  console.log(selectError);

  useEffect(() => {
    setToDate(minToDay);
  }, [fromDate]);

  const routeToProfile = () => {
    setSearch(true);
    if (dest === "") {
      return null;
    }
    router.push(`/search?destination=${dest}&fromDate=${fromDate}&toDate=${toDate}`);
  };

  return (
    <Box
      zIndex={1000}
      pos="absolute"
      backgroundColor="white"
      borderRadius={8}
      mt={10}
      maxW={width < breakpoint ? "200px" : ""}
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
            onChange={(event) => setDest(event.currentTarget.value)}
            isRequired={true}
            borderColor={selectError ? "red" : "white"}
          >
            {data.browseByDestination.map((destination) => (
              <option value={destination.id}>{destination.destinationName}</option>
            ))}
          </Select>
        )}

        <Box maxW={width < breakpoint ? "200px" : ""}>
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

        <Box maxW={width < breakpoint ? "200px" : ""}>
          <DatePicker
            minDate={minToDay}
            maxDate={maxToDay}
            selected={toDate}
            onChange={handleToDateChange}
            showTimeSelect
          />
        </Box>
        <IconButton
          onClick={routeToProfile}
          borderRadius={width < breakpoint ? 8 : 0}
          borderRightRadius={8}
          aria-label="Search database"
          icon={<SearchIcon />}
        />
      </Flex>
    </Box>
  );
};

export default SearchFilterMenu;
