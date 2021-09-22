import { Badge, Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import Image from "next/image";
import { StarIcon } from "@chakra-ui/icons";

interface postProps {
  post: any;
}

const CarDisplayCard: React.FC<postProps> = ({ post }) => {
  const router = useRouter();

  return (
    <Box
      maxW="md"
      borderWidth="1px"
      onClick={() => router.push(`/rental/${post.id}`)}
      cursor="pointer"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image width={250} height={200} layout="responsive" src={post.imageUrl[0]} alt={"no image"} />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {post.trips < 5 ? (
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
          ) : (
            ""
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {post.trips} trips
          </Box>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {post.carMake} &bull; {post.carModel} &bull; {post.carYear}
        </Box>
        <Box>
          <Box as="span" color="gray.600" fontSize="sm">
            &#8377; {post.carCostPerDay}/ Day
          </Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} color={i < post.points ? "teal.500" : "gray.300"} />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {0} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CarDisplayCard;
