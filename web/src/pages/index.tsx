import { Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import AllStarHostsSection from "../components/IndexPageComponents/AllStarHostsSection";
import BackGroundImage from "../components/IndexPageComponents/BackGroundImage";
import BrowseCarouselSection from "../components/IndexPageComponents/BrowseSection";
import ConcludeSection from "../components/IndexPageComponents/ConcludeSection";
import ExperienceBannerSection from "../components/IndexPageComponents/ExperienceBannerSection";
import Layout from "../components/IndexPageComponents/Layout";
import NavBar from "../components/IndexPageComponents/NavBar";
import SearchFilterMenu from "../components/InteractiveComponents/SearchFilterMenu";
import TravelogueSection from "../components/IndexPageComponents/TravelogueSection";
import { withApolloClient } from "../utils/apollo-client";
import { useRouter } from "next/router";

const Index = () => {
  const toast = useToast();
  const router = useRouter();

  console.log(router.query.toast);

  if (router.query?.toast) {
    if (router.query?.toast === "success") {
      const id = "success-toast";
      if (!toast.isActive(id)) {
        toast({
          id: "success-toast",
          title: "Payment Successful",
          description: `We've received your payment. You'll receive a mail shortly.
          The booking can be found in your profile.
          `,
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
        router.replace("/?toast=success", "/", { shallow: true });
      }
    } else {
      const id = "fail-toast";
      if (!toast.isActive(id)) {
        toast({
          id: "fail-toast",
          title: "Payment Failed",
          description: "Any amount debited will be refunded. You'll receive a mail shortly.",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-right",
          variant: "left-accent",
        });
        router.replace("/?toast=fail", "/", { shallow: true });
      }
    }
  }

  return (
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
          <Box
            backgroundColor="gray.200"
            minW={200}
            minH={8}
            zIndex={-100}
            position="absolute"
          ></Box>
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
};

export default withApolloClient({ ssr: true })(Index);
