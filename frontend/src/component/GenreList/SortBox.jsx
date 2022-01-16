import React from "react";
import styled from "styled-components";

function SortBox({ genre }) {
  return (
    <Container>
      <TitleBox>
        <GenreTitle>
          {genre.charAt(0).toUpperCase() + genre.slice(1)} Game
        </GenreTitle>
      </TitleBox>
    </Container>
  );
}

export default SortBox;

const Container = styled.div`
  background: rgb(25, 29, 45);
  height: 50px;
  margin-bottom: 30px;
`;
const TitleBox = styled.div`
  height: 20px;
  line-height: 45px;
  display: inline-block;
  padding-left: 10px;
`;

const GenreTitle = styled.span`
  color: white;
  vertical-align: middle;
  font-size: 20px;
`;

const Sort = styled.div`
  float: right;
  height: 20px;
  line-height: 45px;
`;

const SortLabel = styled.div`
  font-size: 12px;
  color: #4c6c8c;
  display: inline-block;
  margin: 2px 4px 2px 0%;
`;

const SortSelectBox = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 105px;
  position: relative;
  font-size: 12px;
  padding: 0;
  margin: 0;
`;

const SortSelect = styled.select`
  background: rgba(103, 193, 245, 0.2);
  color: white;
  border-radius: 2px;
  border: none;
  padding: 4px 5px;
  margin-left: 5px;
`;

const SortOption = styled.option`
  background: rgb(41, 62, 85);
  color: white;
  border-radius: 2px;
  border: none;
  padding: 4px 5px;
  outline-style: none;
`;
