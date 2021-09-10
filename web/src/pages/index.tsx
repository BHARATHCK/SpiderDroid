import { Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import AllStarHostsSection from "../components/AllStarHostsSection";
import BackGroundImage from "../components/BackGroundImage";
import BrowseCarouselSection from "../components/BrowseSection";
import ConcludeSection from "../components/ConcludeSection";
import ExperienceBannerSection from "../components/ExperienceBannerSection";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import TravelogueSection from "../components/TravelogueSection";

const Index = () => (
  <>
    <NavBar />
    <BackGroundImage />
    <Layout variantType="regular">
      <Box m={10} backgroundColor="gray.200">
        <Flex alignItems="center">
          <Heading m="auto">The world’s largest car sharing marketplace</Heading>
        </Flex>
      </Box>
      <Box m={10}>
        <ExperienceBannerSection></ExperienceBannerSection>
      </Box>
      <Box mt={20}>
        <Heading size="md">Browse by Make</Heading>
        <BrowseCarouselSection itemsToFetch="cars" />
      </Box>
      <Box mt={20}>
        <Heading size="md">Browse by Destination</Heading>
        <BrowseCarouselSection itemsToFetch="destination" />
      </Box>
      <TravelogueSection />
      <AllStarHostsSection />

      <Link ml="20%" position="absolute" mt="25%">
        Book a Car
      </Link>
      <Box>
        <ConcludeSection />
      </Box>
      <Link ml="60%" position="absolute" mt="-10%">
        Become a Host
      </Link>
    </Layout>
  </>
);

export default Index;
