import React from "react";
import styled from "styled-components";

function SearchResultCount({ count }) {
  return (
    <ResultContainer>
      검색에 일치하는 결과가 {count}개 있습니다.
    </ResultContainer>
  );
}

export default SearchResultCount;

const ResultContainer = styled.div`
  background: rgb(25, 29, 45);
  padding: 15px 10px;
  margin-bottom: 20px;
  color: white;
`;
