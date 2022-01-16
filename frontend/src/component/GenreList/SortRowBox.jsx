import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const GenreList = [
  "classic",
  "action",
  "sports",
  "indie",
  "adventure",
  "horror",
  "co-op",
  "story rich",
  "simulation",
  "strategy",
  "massively",
  "puzzle",
];

function SortRowBox() {
  const history = useHistory();

  const mvPageHandler = (page) => (e) => {
    history.push("/genre/" + page);
  };

  return (
    <Container>
      <BtnBox>
        {GenreList.map((genre) => (
          <GenreBtn onClick={mvPageHandler(genre)}>
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </GenreBtn>
        ))}
      </BtnBox>
    </Container>
  );
}

export default SortRowBox;

const Container = styled.div`
  background: rgb(25, 29, 45);
  display: none;
  @media screen and (max-width: 1080px) {
    display: block;
  }
`;

const BtnBox = styled.div`
  margin: 0 auto;
  @media screen and (max-width: 740px) {
    width: 330px;
  }
  @media screen and (max-width: 440px) {
    width: auto;
  }
`;

const GenreBtn = styled.button`
  background-color: transparent;
  color: #4c6c8c;
  height: 50px;
  font-weight: bold;
  border: none;
  width: 110px;
  font-size: 15px;
  vertical-align: middle;
  outline: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: white;
  }
  @media screen and (max-width: 740px) {
    height: 40px;
    font-size: 13px;
  }
`;
