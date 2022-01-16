import React from "react";
import styled from "styled-components";

function SliderTitle({ content }) {
  return (
    <Container>
      <TextBox>
        <Text>{content}</Text>
      </TextBox>
    </Container>
  );
}

export default SliderTitle;

const Container = styled.div`
  height: 50px;
  margin-left: 55px;
  top: 30px;
  display: inline-block;
`;

const TextBox = styled.div`
  height: 20px;
  line-height: 45px;
  display: inline-block;
  padding-left: 10px;
`;

const Text = styled.span`
  color: white;
  vertical-align: middle;
  font-size: 30px;
`;
