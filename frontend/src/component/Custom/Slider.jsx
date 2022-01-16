import React from "react";
import cx from "classnames";
import SliderContext from "./context";
import Content from "./Content";
import SlideButton from "./SlideButton";
import SliderWrapper from "./SliderWrapper";
import useSliding from "./useSliding";
import { useHistory } from "react-router-dom";
import "./Slider.scss";

const Slider = ({
  children,
  contextValue,
  currentSlide,
  handleClose,
  width,
  type,
  no,
}) => {
  const {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    hasNext,
    hasPrev,
  } = useSliding(width, React.Children.count(children));

  const history = useHistory();
  const mvGameInfo = (id) => {
    history.push("/info/" + id);
  };
  return (
    <SliderContext.Provider value={contextValue}>
      <SliderWrapper>
        <div className={cx("slider", { "slider--open": currentSlide != null })}>
          <div ref={containerRef} className="slider__container" {...slideProps}>
            {children}
          </div>
        </div>
        {hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
        {hasNext && <SlideButton onClick={handleNext} type="next" />}
      </SliderWrapper>

      {type === no && currentSlide && (
        <Content
          game={currentSlide}
          onClose={handleClose}
          mvGameInfo={mvGameInfo}
        />
      )}
    </SliderContext.Provider>
  );
};

export default Slider;
