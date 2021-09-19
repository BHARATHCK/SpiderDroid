import { Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import AllStarHostsSection from "../components/AllStarHostsSection";
import BackGroundImage from "../components/BackGroundImage";
import BrowseCarouselSection from "../components/BrowseSection";
import ConcludeSection from "../components/ConcludeSection";
import ExperienceBannerSection from "../components/ExperienceBannerSection";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import SearchFilterMenu from "../components/SearchFilterMenu";
import TravelogueSection from "../components/TravelogueSection";
import { withApolloClient } from "../utils/apollo-client";

const Index = () => (
  <>
    <NavBar />
    <Flex justifyContent="center">
      <SearchFilterMenu />
    </Flex>
    <BackGroundImage />
    <Layout variantType="regular">
      <Box m={10} backgroundColor="gray.200">
        <Flex alignItems="center">
          <Heading m="auto">The world’s largest car sharing marketplace</Heading>
        </Flex>
      </Box>
      <Box mt={10} mb={10}>
        <ExperienceBannerSection></ExperienceBannerSection>
      </Box>
      <Box mt={20}>
        <Heading size="md" mb={10} ml={2}>
          Browse by Make
        </Heading>
        <BrowseCarouselSection itemsToFetch="cars" />
      </Box>
      <Box mt={20}>
        <Heading size="md" mb={10} ml={2}>
          Browse by Destination
        </Heading>
        <BrowseCarouselSection itemsToFetch="destination" />
      </Box>
      <Flex alignItems="center" textAlign="center" direction="column" mt={20}>
        <Box backgroundColor="gray.200" minW={200} minH={8} zIndex={-100} position="absolute"></Box>
        <Heading>Fuel your daydreams</Heading>
        <Text>
          Stoke your wanderlust with some dreamy photo chronicles of road trip adventures.
        </Text>
        <Button mt={20} colorScheme="red">
          Explore Travelogues
        </Button>
        <Box>
          <TravelogueSection />
        </Box>
      </Flex>
      <AllStarHostsSection />
      <ConcludeSection />
    </Layout>
  </>
);

export default withApolloClient({ ssr: true })(Index);
