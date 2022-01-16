import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";

import { MainContent } from "component";

function Main() {
  const location = useLocation();
  const [games, setGames] = useState({
    recentGames: [],
    popularGames: [],
    mostplayedGames: [],
  });

  const { recentGames, popularGames, mostplayedGames } = games;

  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/Main`,
    })
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location]);

  return (
    <MainContainer>
      <MainContent
        recentGames={recentGames}
        popularGames={popularGames}
        mostplayedGames={mostplayedGames}
      />
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  background: #1b2838;
  background-size: cover;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpolygon fill='%231a2533' points='1600 160 0 460 0 350 1600 50'/%3E%3Cpolygon fill='%2319222e' points='1600 260 0 560 0 450 1600 150'/%3E%3Cpolygon fill='%23181f2a' points='1600 360 0 660 0 550 1600 250'/%3E%3Cpolygon fill='%23171c25' points='1600 460 0 760 0 650 1600 350'/%3E%3Cpolygon fill='%23161920' points='1600 800 0 800 0 750 1600 450'/%3E%3C/g%3E%3C/svg%3E");
  padding: 20px 15px;
  @media (min-width: 980px) {
    padding: 40px;
  }
`;
