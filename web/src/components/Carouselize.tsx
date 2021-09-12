import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, useMediaQuery } from "@chakra-ui/react";
import { useEmblaCarousel } from "embla-carousel/react";
import { Props } from "framer-motion/types/types";
import React, { useCallback } from "react";
import styles from "./Carousel.module.css";

const Carouselize: React.FC<Props> = ({ children }) => {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [emblaRef, emblaApi] = useEmblaCarousel({
    draggable: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  return (
    <Flex alignItems="center">
      {isMobile ? (
        ""
      ) : (
        <Box>
          <ChevronLeftIcon w={8} h={8} color="black.500" onClick={scrollPrev} cursor="pointer" />
        </Box>
      )}
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div className={styles.embla__container}>{children}</div>
        </div>
      </div>
      {isMobile ? (
        ""
      ) : (
        <Box>
          <ChevronRightIcon w={8} h={8} color="black.500" onClick={scrollNext} cursor="pointer" />
        </Box>
      )}
    </Flex>
  );
};

export default Carouselize;
