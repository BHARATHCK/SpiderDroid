import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import { useEmblaCarousel } from "embla-carousel/react";
import { Props } from "framer-motion/types/types";
import React, { useCallback } from "react";
import styles from "./Carousel.module.css";
import { useViewport } from "./ViewPortHook";

const Carouselize: React.FC<Props> = ({ children }) => {
  const { width } = useViewport();
  const breakpoint = 700;

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
      {width < breakpoint ? (
        ""
      ) : (
        <Box>
          <ChevronLeftIcon w={8} h={8} color="black.500" onClick={scrollPrev} cursor="pointer" />
        </Box>
      )}
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <Box maxW="100vw" className={styles.embla__container}>
            {children}
          </Box>
        </div>
      </div>
      {width < breakpoint ? (
        ""
      ) : (
        <Box>
          <ChevronRightIcon
            w={8}
            h={8}
            color="black.500"
            onClick={scrollNext}
            cursor="pointer"
            zIndex={1000}
          />
        </Box>
      )}
    </Flex>
  );
};

export default Carouselize;
