import { Box, Image } from "@chakra-ui/react";
import React from "react";
import styles from "./Carousel.module.css";
import Carouselize from "./Carouselize";

interface Props {
  itemsToFetch: string;
}

const BrowseCarouselSection: React.FC<Props> = ({ itemsToFetch }) => {
  let carouselCollection = [];

  if (itemsToFetch === "cars") {
    // Fetch cars
    carouselCollection = [
      {
        imageUrl: "http://dummyimage.com/200x100.png/ff4444/ffffff",
        imageAlt: "Leelah",
        title: "Audi",
      },
      {
        imageUrl: "http://dummyimage.com/210x100.png/cc0000/ffffff",
        imageAlt: "Christa",
        title: "Nissan",
      },
      {
        imageUrl: "http://dummyimage.com/219x100.png/5fa2dd/ffffff",
        imageAlt: "Candie",
        title: "Volkswagen",
      },
      {
        imageUrl: "http://dummyimage.com/128x100.png/dddddd/000000",
        imageAlt: "Fidelia",
        title: "Scion",
      },
      {
        imageUrl: "http://dummyimage.com/101x100.png/ff4444/ffffff",
        imageAlt: "Court",
        title: "Buick",
      },
      {
        imageUrl: "http://dummyimage.com/110x100.png/5fa2dd/ffffff",
        imageAlt: "Winn",
        title: "Mercury",
      },
      {
        imageUrl: "http://dummyimage.com/127x100.png/5fa2dd/ffffff",
        imageAlt: "Allina",
        title: "Audi",
      },
      {
        imageUrl: "http://dummyimage.com/219x100.png/ff4444/ffffff",
        imageAlt: "Nat",
        title: "Buick",
      },
      {
        imageUrl: "http://dummyimage.com/157x100.png/5fa2dd/ffffff",
        imageAlt: "Robin",
        title: "Ford",
      },
      {
        imageUrl: "http://dummyimage.com/145x100.png/dddddd/000000",
        imageAlt: "Corney",
        title: "Nissan",
      },
      {
        imageUrl: "http://dummyimage.com/230x100.png/5fa2dd/ffffff",
        imageAlt: "Alix",
        title: "Jeep",
      },
      {
        imageUrl: "http://dummyimage.com/223x100.png/dddddd/000000",
        imageAlt: "Culver",
        title: "Subaru",
      },
      {
        imageUrl: "http://dummyimage.com/111x100.png/dddddd/000000",
        imageAlt: "Kaile",
        title: "BMW",
      },
      {
        imageUrl: "http://dummyimage.com/244x100.png/ff4444/ffffff",
        imageAlt: "Roobbie",
        title: "Chevrolet",
      },
      {
        imageUrl: "http://dummyimage.com/199x100.png/cc0000/ffffff",
        imageAlt: "Gifford",
        title: "Hyundai",
      },
      {
        imageUrl: "http://dummyimage.com/200x100.png/ff4444/ffffff",
        imageAlt: "Heinrick",
        title: "Nissan",
      },
      {
        imageUrl: "http://dummyimage.com/212x100.png/dddddd/000000",
        imageAlt: "Avie",
        title: "Oldsmobile",
      },
      {
        imageUrl: "http://dummyimage.com/217x100.png/dddddd/000000",
        imageAlt: "Anny",
        title: "GMC",
      },
      {
        imageUrl: "http://dummyimage.com/223x100.png/ff4444/ffffff",
        imageAlt: "Jasun",
        title: "Scion",
      },
      {
        imageUrl: "http://dummyimage.com/205x100.png/ff4444/ffffff",
        imageAlt: "Renaud",
        title: "Dodge",
      },
      {
        imageUrl: "http://dummyimage.com/189x100.png/ff4444/ffffff",
        imageAlt: "Tammara",
        title: "Hummer",
      },
      {
        imageUrl: "http://dummyimage.com/144x100.png/5fa2dd/ffffff",
        imageAlt: "Maris",
        title: "Peugeot",
      },
      {
        imageUrl: "http://dummyimage.com/215x100.png/cc0000/ffffff",
        imageAlt: "Nadiya",
        title: "Honda",
      },
      {
        imageUrl: "http://dummyimage.com/236x100.png/ff4444/ffffff",
        imageAlt: "Bartolomeo",
        title: "Kia",
      },
      {
        imageUrl: "http://dummyimage.com/158x100.png/ff4444/ffffff",
        imageAlt: "Kacey",
        title: "Saab",
      },
      {
        imageUrl: "http://dummyimage.com/237x100.png/ff4444/ffffff",
        imageAlt: "Valaria",
        title: "Mazda",
      },
      {
        imageUrl: "http://dummyimage.com/148x100.png/dddddd/000000",
        imageAlt: "Godart",
        title: "Buick",
      },
      {
        imageUrl: "http://dummyimage.com/189x100.png/dddddd/000000",
        imageAlt: "Jdavie",
        title: "Acura",
      },
      {
        imageUrl: "http://dummyimage.com/114x100.png/5fa2dd/ffffff",
        imageAlt: "Dal",
        title: "Ford",
      },
      {
        imageUrl: "http://dummyimage.com/189x100.png/ff4444/ffffff",
        imageAlt: "Silva",
        title: "Audi",
      },
    ];
  } else if (itemsToFetch === "destination") {
    carouselCollection = [
      {
        imageUrl: "http://dummyimage.com/158x176.png/ff4444/ffffff",
        imageAlt: "Samantha",
        title: "Tasikmalaya",
      },
      {
        imageUrl: "http://dummyimage.com/215x139.png/cc0000/ffffff",
        imageAlt: "Nate",
        title: "Lopar",
      },
      {
        imageUrl: "http://dummyimage.com/166x228.png/dddddd/000000",
        imageAlt: "Merline",
        title: "Wolomarang",
      },
      {
        imageUrl: "http://dummyimage.com/159x135.png/dddddd/000000",
        imageAlt: "Goldi",
        title: "Kabankalan",
      },
      {
        imageUrl: "http://dummyimage.com/213x217.png/5fa2dd/ffffff",
        imageAlt: "Nevins",
        title: "Mashui",
      },
      {
        imageUrl: "http://dummyimage.com/249x159.png/cc0000/ffffff",
        imageAlt: "Matty",
        title: "Wang Saphung",
      },
      {
        imageUrl: "http://dummyimage.com/137x227.png/cc0000/ffffff",
        imageAlt: "Vick",
        title: "Pailles",
      },
      {
        imageUrl: "http://dummyimage.com/207x143.png/ff4444/ffffff",
        imageAlt: "Jacenta",
        title: "Koropí",
      },
      {
        imageUrl: "http://dummyimage.com/246x189.png/dddddd/000000",
        imageAlt: "Chlo",
        title: "Stykkishólmur",
      },
      {
        imageUrl: "http://dummyimage.com/131x136.png/cc0000/ffffff",
        imageAlt: "Danell",
        title: "Velas",
      },
      {
        imageUrl: "http://dummyimage.com/245x212.png/5fa2dd/ffffff",
        imageAlt: "Tatiana",
        title: "Pasirpanjang",
      },
      {
        imageUrl: "http://dummyimage.com/160x220.png/5fa2dd/ffffff",
        imageAlt: "Norine",
        title: "Cipicung",
      },
      {
        imageUrl: "http://dummyimage.com/122x120.png/dddddd/000000",
        imageAlt: "Kassie",
        title: "Wangchuanchang",
      },
      {
        imageUrl: "http://dummyimage.com/188x226.png/5fa2dd/ffffff",
        imageAlt: "Pippy",
        title: "Wakayama-shi",
      },
      {
        imageUrl: "http://dummyimage.com/132x217.png/dddddd/000000",
        imageAlt: "Karleen",
        title: "Tafí del Valle",
      },
      {
        imageUrl: "http://dummyimage.com/105x146.png/dddddd/000000",
        imageAlt: "Reinwald",
        title: "Zernograd",
      },
      {
        imageUrl: "http://dummyimage.com/124x241.png/5fa2dd/ffffff",
        imageAlt: "Jacquenetta",
        title: "Roza",
      },
      {
        imageUrl: "http://dummyimage.com/118x120.png/ff4444/ffffff",
        imageAlt: "Pen",
        title: "Opi",
      },
      {
        imageUrl: "http://dummyimage.com/130x131.png/5fa2dd/ffffff",
        imageAlt: "Tad",
        title: "Chinju",
      },
      {
        imageUrl: "http://dummyimage.com/172x250.png/dddddd/000000",
        imageAlt: "Boot",
        title: "Nizami",
      },
      {
        imageUrl: "http://dummyimage.com/110x240.png/cc0000/ffffff",
        imageAlt: "Halie",
        title: "Cascavel",
      },
      {
        imageUrl: "http://dummyimage.com/221x188.png/cc0000/ffffff",
        imageAlt: "Wilden",
        title: "Carhué",
      },
      {
        imageUrl: "http://dummyimage.com/122x217.png/ff4444/ffffff",
        imageAlt: "Vally",
        title: "Puerto Quellón",
      },
      {
        imageUrl: "http://dummyimage.com/197x231.png/dddddd/000000",
        imageAlt: "Marijn",
        title: "São Sebastião",
      },
      {
        imageUrl: "http://dummyimage.com/114x167.png/cc0000/ffffff",
        imageAlt: "Carlyn",
        title: "Zebrzydowice",
      },
      {
        imageUrl: "http://dummyimage.com/182x244.png/5fa2dd/ffffff",
        imageAlt: "Alexandra",
        title: "Shiḩan as Suflá",
      },
      {
        imageUrl: "http://dummyimage.com/158x137.png/cc0000/ffffff",
        imageAlt: "Arielle",
        title: "Yuandun",
      },
      {
        imageUrl: "http://dummyimage.com/128x199.png/ff4444/ffffff",
        imageAlt: "Kylen",
        title: "Samboan",
      },
      {
        imageUrl: "http://dummyimage.com/127x158.png/dddddd/000000",
        imageAlt: "Katharina",
        title: "Ushuaia",
      },
      {
        imageUrl: "http://dummyimage.com/166x212.png/cc0000/ffffff",
        imageAlt: "Felita",
        title: "Casal Galego",
      },
      {
        imageUrl: "http://dummyimage.com/147x168.png/dddddd/000000",
        imageAlt: "Sansone",
        title: "Prochnookopskaya",
      },
      {
        imageUrl: "http://dummyimage.com/108x175.png/dddddd/000000",
        imageAlt: "Frayda",
        title: "Petrovskaya",
      },
      {
        imageUrl: "http://dummyimage.com/225x235.png/dddddd/000000",
        imageAlt: "Jaquelin",
        title: "Khombole",
      },
      {
        imageUrl: "http://dummyimage.com/161x230.png/ff4444/ffffff",
        imageAlt: "Christen",
        title: "Hamburg",
      },
      {
        imageUrl: "http://dummyimage.com/240x146.png/cc0000/ffffff",
        imageAlt: "Malinda",
        title: "El Aguilar",
      },
      {
        imageUrl: "http://dummyimage.com/195x175.png/ff4444/ffffff",
        imageAlt: "Nicolette",
        title: "Niutang",
      },
      {
        imageUrl: "http://dummyimage.com/168x153.png/cc0000/ffffff",
        imageAlt: "Darnell",
        title: "Sacapulas",
      },
      {
        imageUrl: "http://dummyimage.com/108x187.png/ff4444/ffffff",
        imageAlt: "Martino",
        title: "Ponce",
      },
      {
        imageUrl: "http://dummyimage.com/235x117.png/dddddd/000000",
        imageAlt: "Vi",
        title: "Erdaobaihe",
      },
      {
        imageUrl: "http://dummyimage.com/178x112.png/cc0000/ffffff",
        imageAlt: "Valentine",
        title: "Riangbao",
      },
      {
        imageUrl: "http://dummyimage.com/227x171.png/5fa2dd/ffffff",
        imageAlt: "Anthea",
        title: "Malanday",
      },
      {
        imageUrl: "http://dummyimage.com/105x236.png/cc0000/ffffff",
        imageAlt: "Murray",
        title: "Moste",
      },
      {
        imageUrl: "http://dummyimage.com/208x111.png/cc0000/ffffff",
        imageAlt: "Claus",
        title: "Ditsaan",
      },
      {
        imageUrl: "http://dummyimage.com/165x152.png/5fa2dd/ffffff",
        imageAlt: "Lorettalorna",
        title: "Mŭynoq",
      },
      {
        imageUrl: "http://dummyimage.com/249x131.png/cc0000/ffffff",
        imageAlt: "Kristyn",
        title: "Tenri",
      },
      {
        imageUrl: "http://dummyimage.com/154x118.png/cc0000/ffffff",
        imageAlt: "Ingaberg",
        title: "Baratleke",
      },
      {
        imageUrl: "http://dummyimage.com/239x214.png/ff4444/ffffff",
        imageAlt: "Katleen",
        title: "Krinichnaya",
      },
      {
        imageUrl: "http://dummyimage.com/197x169.png/cc0000/ffffff",
        imageAlt: "Immanuel",
        title: "Thị Trấn Than Uyên",
      },
      {
        imageUrl: "http://dummyimage.com/173x167.png/dddddd/000000",
        imageAlt: "Salomo",
        title: "Trzcińsko Zdrój",
      },
      {
        imageUrl: "http://dummyimage.com/174x170.png/5fa2dd/ffffff",
        imageAlt: "Idalia",
        title: "Nachalovo",
      },
    ];
  }

  return (
    <Carouselize
      children={carouselCollection.map((car) => (
        <div className={styles.embla__slide_cars}>
          <div className={styles.embla__slide__inner}>
            <Box
              mr={2}
              maxW="200"
              maxH="200"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              transition="all .3s ease-in-out"
              _hover={{ transform: "translate3d(0px, -4px, 0px)" }}
            >
              <Image src={car.imageUrl} alt={car.imageAlt} />
              <Box p="4">
                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                  {car.title}
                </Box>
              </Box>
            </Box>
          </div>
        </div>
      ))}
    ></Carouselize>
  );
};

export default BrowseCarouselSection;
