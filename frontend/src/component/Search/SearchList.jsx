import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import RemoveIcon from "@material-ui/icons/Remove";

import windowsimg from "../../assets/img/windows.png";

function SearchList({ games, fetchMoreData }) {
  const scrollTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={games.length}
        next={fetchMoreData}
        hasMore={true}
        style={{ overflow: "hidden" }}
      >
        {games.map((game) => (
          <ContentsBox key={game.id}>
            <Link to={`/info/${game.id}`} onClick={scrollTop}>
              <ImgBox>
                <ContentImg
                  src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.id}/header.jpg`}
                />
              </ImgBox>

              <Content>
                <GameNameBox>
                  <GameBox>
                    <GameName>{game.name}</GameName>
                    <OsBox>
                      <img
                        src={windowsimg}
                        style={{ width: "20px", height: "20px" }}
                        alt=""
                      />
                    </OsBox>
                  </GameBox>

                  <GameDate>{game.releaseDate.substr(0, 10)}</GameDate>
                </GameNameBox>

                <GameScore>
                  {game.recentReviewsPercent >= 70 && <ThumbUpIcon />}
                  {game.recentReviewsPercent >= 40 &&
                    game.recentReviewsPercent < 70 && <RemoveIcon />}
                  {game.recentReviewsPercent < 40 && <ThumbDownIcon />}
                </GameScore>
                <GamePriceContainer>
                  <GameDiscountBox>
                    {/* <GameGameDiscount>-50%</GameGameDiscount> */}
                  </GameDiscountBox>
                  <GamePriceBox>
                    <GamePrice>{game.originalPrice}</GamePrice>
                  </GamePriceBox>
                </GamePriceContainer>
              </Content>
            </Link>
          </ContentsBox>
        ))}
      </InfiniteScroll>
    </>
  );
}

export default SearchList;

const ContentsBox = styled.div`
  background: rgb(28, 67, 91);
  height: 70px;
  margin-top: 10px !important;
  &:hover {
    background: rgb(38, 77, 105);
  }
`;

const ImgBox = styled.div`
  width: 180px;
  height: 70px;
  display: inline-block;
  @media screen and (max-width: 740px) {
    width: 100px;
    float: left;
    display: block;
  }
`;

const ContentImg = styled.img`
  width: 180px;
  height: 70px;
  border: none;
  padding: 0;
  border: 0;
  @media screen and (max-width: 740px) {
    width: 100px;
  }
`;

const Content = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 0;
  margin: 0;
  color: #c6d4df;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: 300;
  @media screen and (max-width: 740px) {
    overflow: hidden;
    padding-left: 12px;
    display: block;
  }
`;

const GameNameBox = styled.div`
  width: 550px;
  margin-left: 5px;
  height: 70px;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0;

  @media screen and (max-width: 1080px) {
    width: 400px;
  }
  @media screen and (max-width: 855px) {
    width: 280px;
  }
  @media screen and (max-width: 740px) {
    float: none;
    width: 100px;
    margin: 0;
    height: auto;
    line-height: normal;
  }
`;
const GameBox = styled.div`
  width: 380px;
  display: inline-block;
  @media screen and (max-width: 1080px) {
    width: 280px;
  }
  @media screen and (max-width: 855px) {
    width: 160px;
  }
  @media screen and (max-width: 740px) {
    float: none;
    width: 100px;
    margin: 0;
    height: auto;
    line-height: normal;
  }
`;

const GameName = styled.span`
  margin-top: 10px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #c7d5e0;
  width: 370px;
  @media screen and (max-width: 1080px) {
    width: 270px;
  }
  @media screen and (max-width: 855px) {
    width: 150px;
  }
  @media screen and (max-width: 740px) {
    display: block;
    float: none;
    width: 100px;
    margin: 0;
    height: auto;
    line-height: normal;
  }
`;

const GameDate = styled.div`
  width: 120px;
  color: #4c6c8c;
  font-size: 15px;
  line-height: 70px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  vertical-align: top;
  font-weight: 500;
  @media screen and (max-width: 740px) {
    display: block;
    width: 100px;
    line-height: 20px;
  }
`;

const GameScore = styled.div`
  width: 30px;
  font-size: 11px;
  line-height: 55px;
  height: 16px;
  padding: 14px 0 15px 0;
  text-align: center;
  display: inline-block;
  vertical-align: top;
  margin-right: 30px;
  @media screen and (max-width: 740px) {
    padding: 0;
    margin-right: 0;
    line-height: 82px;
    height: 18px;
  }
  @media screen and (max-width: 540px) {
    display: none;
  }
`;

const GamePriceContainer = styled.div`
  height: 70px;
  display: inline-block;
  vertical-align: top;
  margin-right: 20px;
  @media screen and (max-width: 740px) {
    float: right;
    padding-right: 8px;
    line-height: 18px;
    height: 70px;
    display: block;
    margin-right: 0;
  }
`;

const GameDiscountBox = styled.div`
  width: 40px;
  height: 70px;
  display: inline-block;
  vertical-align: top;
  @media screen and (max-width: 740px) {
    float: none;
    width: 50px;
    margin: 0;
    height: auto;
    line-height: normal;
    display: block;
    margin: 12px auto 8px;
  }
`;

// const GameGameDiscount = styled.span`
//   color: #8bc53f;
//   font-size: 12px;
//   padding: 5px;
//   background-color: #4c6b22;
//   display: block;
//   margin-top: 20px;
//   text-align: center;
//   @media screen and (max-width: 740px) {
//     padding: 0 5px;
//     margin-top: 0;
//   }
// `;

const GamePriceBox = styled.div`
  line-height: 70px;
  width: 100px;
  text-align: right;
  height: 70px;
  display: inline-block;
  vertical-align: top;
  @media screen and (max-width: 740px) {
    padding-top: 0;
    min-width: 100px;
    width: auto;
    line-height: 18px;
    height: 18px;
    float: left;
    display: block;
    text-align: center;
    margin: 0 auto;
    padding-left: 5px;
  }
`;

const GamePrice = styled.span`
  color: rgb(255, 255, 255);
  @media screen and (max-width: 740px) {
    display: inline-block;
    margin-right: 4px;
  }
`;

const OsBox = styled.div`
  margin: 0;
  padding: 0;
`;
