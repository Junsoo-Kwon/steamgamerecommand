import React from "react";
import IconCross from "./../Icons/IconCross";
import "./Content.scss";

const Content = ({ game, onClose, mvGameInfo }) => (
  <div className="content">
    <div className="content__background">
      <div className="content__background__shadow" />
      <div
        className="content__background__image"
        style={{
          backgroundImage: `url(https://cdn.cloudflare.steamstatic.com/steam/apps/${game._id}/library_hero.jpg)`,
        }}
      />
    </div>
    <div className="content__area">
      <div className="content__area__container">
        <div className="content__title">{game.name}</div>
        <div className="content__description">{game.gameDescription}</div>
        <div className="btn_box">
          <button
            className="content__info"
            onClick={() => {
              mvGameInfo(game._id);
            }}
          >
            상세보기
          </button>
        </div>
      </div>
      <button className="content__close" onClick={onClose}>
        <IconCross />
      </button>
    </div>
  </div>
);

export default Content;
