import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

function SystemRequirements({ game }) {
  return (
    <Container>
      <div>
        <div>
          <Typography variant="h6" gutterBottom>
            시스템 요구사항
          </Typography>
        </div>
        {game.minimumRequirements === "" ? (
          <></>
        ) : (
          <Content>{game.minimumRequirements}</Content>
        )}
        {game.recommendedRequirements === "" ? (
          <></>
        ) : (
          <Content>{game.recommendedRequirements}</Content>
        )}
      </div>
    </Container>
  );
}

export default SystemRequirements;

const Container = styled.div`
  color: #fff;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: inherit;
  background: rgb(25, 29, 45);
  padding: 10px;
`;

const Content = styled.div`
  background: rgb(34, 58, 76);
  padding: 5px 10px;
`;
