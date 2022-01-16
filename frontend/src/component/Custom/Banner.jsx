import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import "./Banner.scss";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

function Banner({ popularGames }) {
  const [number, setNumber] = useState(0);
  const history = useHistory();

  const timer = useRef(0);

  const ImageSlider = (num) => {
    if (num === -1 && number === 0) {
      setNumber(9);
    } else if (num === 1 && number === 9) {
      setNumber(0);
    } else {
      setNumber(number + num);
    }

    timer.current = 1;
  };

  // setTimeout(() => {
  //   if (timer.current === 1) {
  //     return;
  //   } else {
  //     if (number + 1 > 9) {
  //       setNumber(0);
  //     } else {
  //       setNumber(number + 1);
  //     }

  //     timer.current = 0;
  //   }
  // }, 3500);

  const mvGameInfo = (id) => {
    history.push("/info/" + id);
  };

  return (
    <div>
      {
        <BannerBox>
          <BtnBox>
            <button
              className="left_arrow"
              onClick={() => {
                ImageSlider(-1);
              }}
            >
              <NavigateBeforeIcon />
            </button>
            <CenterLine />
            <button
              className="right_arrow"
              onClick={() => {
                ImageSlider(+1);
              }}
            >
              <NavigateNextIcon />
            </button>
          </BtnBox>
          {console.log("popularGames[number]", popularGames[number])}
          <ImageBox
            style={{
              backgroundImage: `url(https://cdn.cloudflare.steamstatic.com/steam/apps/${popularGames[number]._id}/library_hero.jpg)`,
            }}
          ></ImageBox>

          <Shadow />
          <MiddleShadow />
          <ContentArea>
            <ContentTitle>{popularGames[number].name}</ContentTitle>
            <ContentDescription>
              {popularGames[number].gameDescription}
            </ContentDescription>
            <BoxBox>
              <InfoBtn
                onClick={() => {
                  mvGameInfo(popularGames[number]._id);
                }}
              >
                상세보기
              </InfoBtn>
            </BoxBox>
          </ContentArea>
        </BannerBox>
      }
    </div>
  );
}

export default Banner;

const BoxBox = styled.div`
  width: 30%;
  height: 10%;
  position: absolute;
  bottom: 70px;
  left: 50px;
`;

const BannerBox = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 50px;
  position: relative;
`;

const BtnBox = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  border: 1px solid black;
  z-index: 10;
  background: white;
`;

const ImageBox = styled.div`
  right: 0;
  width: 70%;
  height: 100%;
  background-position: center 10%;
  background-size: cover;
  position: absolute;
  top: 0;
  bottom: 0;
`;
const ContentArea = styled.div`
  padding: 30px 70px;
  left: 0;
  right: 0;
  height: 100%;
  z-index: 3;
  position: absolute;
  top: 0;
  bottom: 0;
`;

const ContentDescription = styled.div`
  font-size: 18px;
  color: #ffffff;
  margin-top: 20px;
  width: 30%;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
`;

const ContentTitle = styled.div`
  font-size: 45px;
  color: #fff;
  font-weight: 700;
  height: 10%;
`;

const CenterLine = styled.div`
  border-right: 1px solid black;
  margin: 0 10px;
  display: inline-block;
  height: 22px;
`;
const Shadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 35%;
  height: 100%;
  background-image: linear-gradient(
    to right,
    rgba(27, 40, 56, 1),
    rgba(27, 40, 56, 1)
  );
  opacity: 1;
`;

const MiddleShadow = styled.div`
  position: absolute;
  top: 0;
  left: 35%;
  width: 10%;
  height: 100%;
  background-image: linear-gradient(
    to right,
    rgba(27, 40, 56, 1),
    rgba(27, 40, 56, 0)
  );
  opacity: 1;
`;

const InfoBtn = styled.button`
  float: right;
  background: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 20px;
`;
