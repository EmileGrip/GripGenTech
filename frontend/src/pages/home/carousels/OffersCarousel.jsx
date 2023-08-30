import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  DotButton,
  PrevButton,
  NextButton,
} from "./EmblaCarouselArrowsDotsBtns";
import itemByIndex from "../../../helpers/itemByIndex";
import { Stack, Typography } from "@mui/material";
import styles from "../../../styles/offersCarousel.module.css";

const OffersCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <>
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div className={styles.embla__container}>
            {slides.map((index) => (
              <div className={styles.embla__slide} key={index}>
                <img
                  className={styles.embla__slide__img}
                  src={itemByIndex(index)["thumbnail"]}
                  alt="Your alt text"
                />

                <Stack
                  className={styles.embla__slide__inner}
                  sx={{
                    color: "background.default",
                    gap: "10px",
                    userSelect: "none",
                  }}
                >
                  <Typography
                    className={styles.embla__slide__price}
                    variant="h4"
                    color="inherit"
                  >
                    {itemByIndex(index)["price"]}
                  </Typography>

                  <Typography
                    className={styles.embla__slide__description}
                    variant="body1"
                    color="inherit"
                    sx={{
                      fontWeight: 500,
                      fontSize: {
                        xs: "0.75rem",
                        md: "0.875rem",
                        lg: "1.125rem",
                      },
                    }}
                  >
                    {itemByIndex(index)["description"]}
                  </Typography>
                </Stack>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.embla__buttons}>
          <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
          <div className={styles.embla__dots}>
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => scrollTo(index)}
                className={`${styles.embla__dot} ${
                  index === selectedIndex ? styles["embla__dot--selected"] : ""
                }`}
              />
            ))}
          </div>
          <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
        </div>
      </div>
    </>
  );
};

export default OffersCarousel;
