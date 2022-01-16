import React from "react";
import styled from "styled-components";

import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

function GenreBox() {
  const history = useHistory();

  const mvPageHandler = (page) => (e) => {
    history.push("/genre/" + page);
  };

  return (
    <Container>
      <Title>
        <Typography variant="h5" gutterBottom>
          Genre
        </Typography>
      </Title>
      <Genre>
        <GenreRow>
          <GenreBtn onClick={mvPageHandler("classic")}>Classic</GenreBtn>
          <GenreBtn onClick={mvPageHandler("action")}>Action</GenreBtn>
        </GenreRow>
        <GenreRow>
          <GenreBtn onClick={mvPageHandler("sports")}>Sports</GenreBtn>
          <GenreBtn onClick={mvPageHandler("indie")}>Indie</GenreBtn>
        </GenreRow>
        <GenreRow>
          <GenreBtn onClick={mvPageHandler("adventure")}>Adventure</GenreBtn>
          <GenreBtn onClick={mvPageHandler("horror")}>Horror</GenreBtn>
        </GenreRow>
        <GenreRow>
          <GenreBtn onClick={mvPageHandler("co-op")}>Co-op</GenreBtn>
          <GenreBtn onClick={mvPageHandler("story rich")}>Story rich</GenreBtn>
        </GenreRow>
        <GenreRow>
          <GenreBtn onClick={mvPageHandler("simulation")}>Simulation</GenreBtn>
          <GenreBtn onClick={mvPageHandler("strategy")}>Strategy</GenreBtn>
        </GenreRow>
        <GenreRow>
          <GenreBtn onClick={mvPageHandler("massively")}>Massively</GenreBtn>
          <GenreBtn onClick={mvPageHandler("puzzle")}>Puzzle</GenreBtn>
        </GenreRow>
      </Genre>
    </Container>
  );
}

export default GenreBox;

const Container = styled.div`
  position: fixed;
`;

const Title = styled.div`
  color: white;
  text-align: center;
  margin-bottom: 10px;
`;

const Genre = styled.div`
  background: rgb(25, 29, 45);
  height: 300px;
  border: none;
  border-radius: 5px;
  padding: 15px 10px;
`;

const GenreRow = styled.div`
  width: 220px;
  height: 50px;
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
`;
