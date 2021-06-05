import React, { useEffect, useRef, useState } from "react";
import "./ScrollerCarousel.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";
import { actions } from "./constants";
import { ControlButton } from "./components";

const ScrollerCarousel = ({
  cards,
  Card,
  className,
  controlButtons,
  scrollerData,
  scrollToIndex,
}) => {
  const [scrollerState, setScrollerState] = useState({
    start: true,
    end: false,
  });
  let scrollerWrapperRef = useRef(null);
  const cardsCount = cards?.length;
  const { NEXT, PREV } = actions;

  useEffect(() => {
    if (scrollerWrapperRef && scrollerWrapperRef?.current) {
      scrollerWrapperRef?.current?.addEventListener(
        "scroll",
        handleScrollerState
      );
    }
    return () => {
      scrollerWrapperRef?.current?.removeEventListener(
        "scroll",
        handleScrollerState
      );
    };
  }, []);

  useEffect(() => {
    let { childNodes } = scrollerWrapperRef?.current;
    if (scrollerWrapperRef && scrollerWrapperRef?.current) {
      if (scrollToIndex >= 0) {
        const x = [...childNodes]
          ?.slice(0, scrollToIndex - 1)
          ?.reduce((acc, child) => {
            return (acc += child?.clientWidth);
          }, 0);

        scrollerWrapperRef.current.scrollTo(x, 0);
      }
      setTimeout(() => {
        handleScrollerState();
      }, 500);
    }
  }, [cards]);

  const handleControlButtonScroll = (dir) => {
    if (scrollerWrapperRef && scrollerWrapperRef?.current) {
      let { speed, distance, step } = scrollerData;
      if (dir === PREV) {
        step *= -1;
      }

      let scrollAmount = 0;
      const slideTimer = setInterval(() => {
        scrollerWrapperRef.current.scrollLeft += step;
        scrollAmount += Math.abs(step);
        if (scrollAmount >= distance) {
          clearInterval(slideTimer);
        }
      }, speed);
    }
  };

  const handleScrollerState = () => {
    let { scrollWidth, scrollLeft, clientWidth } = scrollerWrapperRef?.current;
    let noScroll = scrollWidth === clientWidth;

    if (noScroll) {
      setScrollerState({
        start: noScroll,
        end: noScroll,
      });
    } else {
      setScrollerState({
        start: scrollLeft === 0,
        end: scrollWidth - scrollLeft === clientWidth,
      });
    }
  };

  return (
    <div className={`scroller-carousel ${className}`}>
      <ul className={`scroller-wrapper`} ref={scrollerWrapperRef}>
        {cards?.map((card) => {
          return (
            <li>
              <Card cardData={card} />
            </li>
          );
        })}
      </ul>

      {cardsCount > 1 && controlButtons && (
        <>
          <ControlButton
            onClick={() => {
              handleControlButtonScroll(PREV);
            }}
            className={`prev ${scrollerState?.start ? "disabled" : ""}`}
            children={<FaChevronLeft />}
          />
          <ControlButton
            onClick={() => {
              handleControlButtonScroll(NEXT);
            }}
            className={`next ${scrollerState?.end ? "disabled" : ""}`}
            children={<FaChevronRight />}
          />
        </>
      )}
    </div>
  );
};

ScrollerCarousel.defaultProps = {
  className: "",
  controlButtons: true,
  scrollerData: {
    speed: 25,
    distance: 500,
    step: 50,
  },
  scrollToIndex: null,
};
ScrollerCarousel.propTypes = {
  cards: PropTypes.array.isRequired,
  Card: PropTypes.any.isRequired,
  className: PropTypes.string,
  controlButtons: PropTypes.bool,
  scrollerData: PropTypes.shape({
    speed: PropTypes.number,
    distance: PropTypes.number,
    step: PropTypes.number,
  }),
  scrollToIndex: PropTypes.number,
};

export default ScrollerCarousel;
