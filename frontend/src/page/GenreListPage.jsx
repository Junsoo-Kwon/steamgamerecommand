import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { SortBox, GenreList, GenreBox, SortRowBox } from "component";
import { useLocation } from "react-router-dom";
import axios from "axios";

function GenreListPage({ match }) {
  const genre = match.params.genre;

  const [games, setGames] = useState({
    content: [],
  });

  const { content } = games;

  const pageno = useRef(1);
  const location = useLocation();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setIsDone(false);
    axios({
      method: "GET",
      url: `/api/gameinfo/tag/${genre}?pageno=0`,
    })
      .then((response) => {
        setGames(response.data.gameinfo);
        setIsDone(true);
      })
      .catch((error) => {
        console.log(error);
        setIsDone(true);
      });
  }, [location]);

  const fetchMoreData = () => {
    setTimeout(() => {
      axios({
        method: "GET",
        url: `/api/gameinfo/tag/${genre}?pageno=${pageno.current++}`,
      })
        .then((response) => {
          setGames({
            content: content.concat(response.data.gameinfo.content),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  };

  return (
    <MainContainer>
      <SubContainer>
        {isDone && (
          <>
            <LeftBox>
              <SortBox genre={genre} />
              <SortRowBox />
              <GenreList games={games.content} fetchMoreData={fetchMoreData} />
            </LeftBox>
            <RightBox>
              <GenreBox />
            </RightBox>
          </>
        )}
      </SubContainer>
    </MainContainer>
  );
}

export default GenreListPage;

const MainContainer = styled.div`
  background: rgb(26, 40, 56);
  padding-top: 20px;
  display: flex;
  width: 100%;
  @media (min-width: 980px) {
    padding-top: 40px;
  }
`;

const SubContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;
  & > * {
    margin-top: 20px;
  }
`;

const LeftBox = styled.div`
  width: 686px;
  float: left;
  padding: 0;
  margin: 0;
  @media screen and (max-width: 1080px) {
    float: none;
    margin: 0 auto;
  }
  @media screen and (max-width: 740px) {
    max-width: 400px;
  }
  @media screen and (max-width: 440px) {
    max-width: 330px;
  }
`;

const RightBox = styled.div`
  width: 238px;
  margin-left: 30px;
  float: right;
  padding: 0;
  @media screen and (max-width: 1080px) {
    display: none;
  }
`;
