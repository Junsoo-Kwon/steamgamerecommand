import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { SearchBar, SearchList, SearchResultCount } from "component";

function SearchPage({ match }) {
  const name = match.params.name;

  const [games, setGames] = useState({
    content: [],
    totalElements: 0,
  });

  const { content } = games;
  const pageno = useRef(1);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const isKorean = location.state.isKorean;
      const maxPrice = location.state.maxPrice;
      axios
        .get(
          `/api/gameinfo/gamesearch/${name}?KLsupport=${isKorean}${
            maxPrice !== "" ? `&comparePrice=${maxPrice}` : ""
          }&pageno=0`
        )
        .then((response) => {
          setGames(response.data.gameinfo);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios({
        method: "GET",
        url: `/api/gameinfo/gamesearch/${name}?pageno=0`,
      })
        .then((response) => {
          setGames(response.data.gameinfo);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location]);

  const fetchMoreData = () => {
    setTimeout(() => {
      if (location.state) {
        const isKorean = location.state.isKorean;
        const maxPrice = location.state.maxPrice;

        axios
          .get(
            `/api/gameinfo/gamesearch/${name}?KLsupport=${isKorean}&comparePrice=${maxPrice}&pageno=${pageno.current++}`
          )
          .then((response) => {
            setGames({
              content: content.concat(response.data.gameinfo.content),
              totalElements: response.data.gameinfo.totalElements,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios({
          method: "GET",
          url: `/api/gameinfo/gamesearch/${name}?pageno=${pageno.current++}`,
        })
          .then((response) => {
            setGames({
              content: content.concat(response.data.gameinfo.content),
              totalElements: response.data.gameinfo.totalElements,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 1000);
  };

  return (
    <MainContainer>
      <SubContainer>
        <SearchBar />
        <SearchResultCount count={games.totalElements} />
        <SearchList games={games.content} fetchMoreData={fetchMoreData} />
      </SubContainer>
    </MainContainer>
  );
}

export default SearchPage;

const MainContainer = styled.div`
  background: rgb(26, 40, 56);
  padding: 20px 5px;
  @media (min-width: 980px) {
    padding: 40px;
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
