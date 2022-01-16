import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Slider,
  Item,
  useSizeElement,
  SliderTitle,
  Banner,
  ProgressBar,
} from "component";

const isEmptyArray = (arr) => {
  return arr.constructor === Array && arr.length === 0;
};
const userSelector = (state) => {
  return state.UserReducer.account;
};
function CustomPage() {
  const [type, setType] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);
  const { width, elementRef } = useSizeElement();
  const user = useSelector(userSelector);

  /* 배너 */
  const location = useLocation();
  const [popularGames, setPopularGames] = useState([]);
  const [customGames, setCustomGames] = useState([]);
  const [tagGames, setTagGames] = useState([]);
  // const [isDone, setIsDone] = useState(false);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    // setIsDone(false);
    axios({
      url: `/custom/game/all`,
    })
      .then((response) => {
        setPopularGames(response.data);
        console.log(response.data);
        // setIsDone(true);
      })
      .catch((error) => {
        // setIsDone(false);
        console.log(error);
        // setIsDone(false);
      });

    if (user.id) {
      axios({
        url: `/custom/user/${user.id}`,
      })
        .then((response) => {
          setCustomGames(response.data.userTotalRecommend);
          setTagGames(response.data.tagTotalRecommend);

          // setIsDone(true);
        })
        .catch((error) => {
          console.log(error);
          // setIsDone(false);
        });
    }
  }, [user]);

  const handleSelect = (game, no) => {
    setCurrentSlide(game);
    setType(no);
  };

  const handleClose = () => {
    setCurrentSlide(null);
    setType(null);
  };

  const contextValue = {
    onSelectSlide: handleSelect,
    onCloseSlide: handleClose,
    elementRef,
    currentSlide,
  };

  const mvGameInfo = (name) => {
    history.push("/genre/" + name);
  };

  return (
    <>
      <Container>
        <SubContainer>
          {!isEmptyArray(popularGames) &&
          !isEmptyArray(customGames) &&
          !isEmptyArray(tagGames) ? (
            <>
              <Banner popularGames={popularGames} />

              <div>
                <SliderTitle content={"Recommend"} />
                <Slider
                  contextValue={contextValue}
                  currentSlide={currentSlide}
                  handleClose={handleClose}
                  width={500}
                  no={0}
                  type={type}
                >
                  {console.log("customGames", customGames)}
                  {customGames.map((game) => (
                    <Item game={game} key={game._id} no={0} type={type}></Item>
                  ))}
                </Slider>
              </div>
              {Object.keys(tagGames).map((tagname, index) => (
                <>
                  <div>
                    <SliderTitle content={tagname} />
                    <MoreBtn
                      onClick={() => {
                        mvGameInfo(tagname);
                      }}
                    >
                      더보기
                    </MoreBtn>
                    <Slider
                      contextValue={contextValue}
                      currentSlide={currentSlide}
                      handleClose={handleClose}
                      width={500}
                      no={index + 1}
                      type={type}
                    >
                      {eval(tagGames[tagname]).map((game, idx) => (
                        <Item
                          game={game}
                          key={game.id}
                          no={index + 1}
                          type={type}
                        >
                          item1
                        </Item>
                      ))}
                    </Slider>
                  </div>
                </>
              ))}
            </>
          ) : (
            <ProgressBar />
          )}
        </SubContainer>
      </Container>
    </>
  );
}

export default CustomPage;

const Container = styled.div`
  background: #1b2838;
  background-size: cover;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpolygon fill='%231a2533' points='1600 160 0 460 0 350 1600 50'/%3E%3Cpolygon fill='%2319222e' points='1600 260 0 560 0 450 1600 150'/%3E%3Cpolygon fill='%23181f2a' points='1600 360 0 660 0 550 1600 250'/%3E%3Cpolygon fill='%23171c25' points='1600 460 0 760 0 650 1600 350'/%3E%3Cpolygon fill='%23161920' points='1600 800 0 800 0 750 1600 450'/%3E%3C/g%3E%3C/svg%3E");
  min-height: 93vh;
`;

const SubContainer = styled.div`
  width: 100%;
  margin: 0px auto;
  overflow: hidden;
`;

const MoreBtn = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 2px;
  float: right;
  padding: 7px 15px;
  margin: 10px 15px;
  color: white;
  cursor: pointer;
  &:hover {
    background: rgba(57, 70, 86, 0.5);
  }
`;
