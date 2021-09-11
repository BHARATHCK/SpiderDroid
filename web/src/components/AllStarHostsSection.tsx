import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, IconButton, Text, useMediaQuery, WrapItem } from "@chakra-ui/react";
import { useEmblaCarousel } from "embla-carousel/react";
import Image from "next/image";
import React, { useCallback } from "react";
import medal from "../../assets/ribbon.png";
import styles from "./Carousel.module.css";
import Carouselize from "./Carouselize";

const AllStarHostsSection = () => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  let starsRated = [1, 2, 3, 4, 5];

  const person = [
    {
      profileImage: "https://robohash.org/temporacommodiincidunt.png?size=50x50&set=set1",
      userName: "Yancy",
      rating: 5,
      createdAt: "2021-08-07 18:41:13",
      comment:
        "Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.",
      commentUserName: "Johna",
      trips: 3194,
      id: 1,
    },
    {
      profileImage: "https://robohash.org/utcumeligendi.png?size=50x50&set=set1",
      userName: "Gustavus",
      rating: 5,
      createdAt: "2021-07-03 19:23:36",
      comment:
        "Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
      commentUserName: "Alyosha",
      trips: 3947,
      id: 2,
    },
    {
      profileImage: "https://robohash.org/quiaconsequaturdolorem.png?size=50x50&set=set1",
      userName: "Robbie",
      rating: 5,
      createdAt: "2021-01-04 03:16:19",
      comment:
        "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.",
      commentUserName: "Fallon",
      trips: 683,
      id: 3,
    },
    {
      profileImage: "https://robohash.org/quiaetin.png?size=50x50&set=set1",
      userName: "Kean",
      rating: 5,
      createdAt: "2021-05-21 00:31:47",
      comment: "Nulla nisl. Nunc nisl.",
      commentUserName: "Zsa zsa",
      trips: 2605,
      id: 4,
    },
    {
      profileImage: "https://robohash.org/veniamsuscipitdelectus.png?size=50x50&set=set1",
      userName: "Nelson",
      rating: 5,
      createdAt: "2021-04-28 02:50:45",
      comment:
        "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo.",
      commentUserName: "Andie",
      trips: 4359,
      id: 5,
    },
    {
      profileImage: "https://robohash.org/quidelectusdignissimos.png?size=50x50&set=set1",
      userName: "Adele",
      rating: 5,
      createdAt: "2020-09-16 08:26:09",
      comment:
        "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.",
      commentUserName: "Ches",
      trips: 4454,
      id: 6,
    },
    {
      profileImage: "https://robohash.org/molestiaeeligendivoluptates.png?size=50x50&set=set1",
      userName: "Odella",
      rating: 5,
      createdAt: "2021-02-08 13:30:20",
      comment:
        "In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.",
      commentUserName: "Ignacius",
      trips: 4554,
      id: 7,
    },
    {
      profileImage: "https://robohash.org/voluptatibusnumquamculpa.png?size=50x50&set=set1",
      userName: "Brittan",
      rating: 5,
      createdAt: "2021-07-03 02:13:29",
      comment:
        "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.",
      commentUserName: "Nero",
      trips: 6622,
      id: 8,
    },
    {
      profileImage: "https://robohash.org/utnobisearum.png?size=50x50&set=set1",
      userName: "Brandy",
      rating: 5,
      createdAt: "2021-07-05 23:39:03",
      comment:
        "Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.",
      commentUserName: "Mike",
      trips: 4091,
      id: 9,
    },
    {
      profileImage: "https://robohash.org/eumcumqueconsequuntur.png?size=50x50&set=set1",
      userName: "Karol",
      rating: 5,
      createdAt: "2021-01-17 11:25:31",
      comment:
        "Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
      commentUserName: "Dacy",
      trips: 6734,
      id: 10,
    },
  ];

  return (
    <Carouselize
      children={person.map((p) => {
        return (
          <div
            className={isMobile ? styles.embla__slide_cars_mobile : styles.embla__slide_cars}
            key={p.id}
          >
            <Box
              mt={20}
              boxShadow="lg"
              p="6"
              rounded="md"
              bg="white"
              minW={200}
              minH={200}
              maxW={350}
              maxH={400}
              transition="all .3s ease-in-out"
              _hover={{ transform: "translate3d(0px, -4px, 0px)" }}
            >
              <Flex direction="row">
                <WrapItem>
                  <Avatar name="Dan Abramov" src={p.profileImage} />
                </WrapItem>
                <Box ml={5}>
                  <Text fontWeight={600}>Dan Abramov</Text>
                  <Flex direction="row">
                    <Image min-height={8} src={medal}></Image>
                    <Text>All-Star Host</Text>
                  </Flex>
                  <Flex direction="row">
                    <Text>{p.trips}</Text>
                    <Text>. {p.createdAt}</Text>
                  </Flex>
                </Box>
              </Flex>
              <Flex direction="column">
                <Flex direction="row">
                  {starsRated.map(() => {
                    return <StarIcon w={4} h={4} color="blue.500" />;
                  })}
                </Flex>
                <Text
                  textDecoration="none"
                  display="block"
                  maxH={100}
                  maxW={350}
                  textOverflow="clip"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {p.comment}
                </Text>
                <Flex direction="row">
                  <Text>{p.commentUserName}</Text>
                  <Text>Sep 10</Text>
                </Flex>
              </Flex>
            </Box>
          </div>
        );
      })}
    />
  );
};

export default AllStarHostsSection;
