import React from "react";
import cx from "classnames";
import SliderContext from "./context";
import ShowDetailsButton from "./ShowDetailsButton";
import Mark from "./Mark";
import "./Item.scss";

const Item = ({ game, type, no }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive =
        currentSlide && currentSlide._id === game._id && type === no;

      return (
        <>
          <div
            ref={elementRef}
            className={cx("item", {
              "item--open": isActive,
            })}
          >
            <img
              src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game._id}/header.jpg`}
              alt=""
            />
            <ShowDetailsButton onClick={() => onSelectSlide(game, no)} />
            {isActive && <Mark />}
          </div>
        </>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
