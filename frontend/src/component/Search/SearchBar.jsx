import React, { useState } from "react";
import styled from "styled-components";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  makeStyles,
} from "@material-ui/core";

function SearchBar() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isKorean, setIsKorean] = useState(false);
  const [maxPrice, setMaxPrice] = useState("");
  const history = useHistory();
  const classes = useStyles();
  // SearchValue 변화 값 수정.
  const searchChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  // Search
  const enterSearch = () => {
    if (window.event.keyCode === 13) {
      let kyCheck = searchKeyword.replace(/ /gi, "");

      if (kyCheck === "") {
        return swal("", "검색어를 입력해주세요.");
      }
      // 키워드, 검색타입 체크 알고리즘
      if (searchKeyword === "") {
        return swal("", "검색어를 입력해주세요.");
      }

      setSearchKeyword("");

      history.push({
        pathname: `/search/${searchKeyword}`,
        state: { isKorean: isKorean, maxPrice: maxPrice },
      });
    }
  };

  const clickSearch = () => {
    let kyCheck = searchKeyword.replace(/ /gi, "");

    if (kyCheck === "") {
      return swal("", "검색어를 입력해주세요.");
    }
    // 키워드, 검색타입 체크 알고리즘
    if (searchKeyword === "") {
      return swal("", "검색어를 입력해주세요.");
    }

    setSearchKeyword("");

    history.push({
      pathname: `/search/${searchKeyword}`,
      state: { isKorean: isKorean, maxPrice: maxPrice },
    });
  };

  const handleChangeKorean = (e) => {
    setIsKorean(e.target.checked);
  };
  const onChangePrice = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <SearchContainer>
      <SearchBarInput
        type="text"
        value={searchKeyword}
        onChange={searchChange}
        onKeyUp={enterSearch}
        placeholder="Search…"
      />
      <SearchBtn>
        <SearchBtnSpan onClick={clickSearch}>Search</SearchBtnSpan>
      </SearchBtn>
      <SortBox>
        <FilterBox>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox onChange={handleChangeKorean} />}
              label="한국어 지원"
              className={classes.root}
            />
            {/* <SearchBarInput
        type="text"
        value={searchKeyword}
        onChange={searchChange}
        onKeyUp={enterSearch}
        placeholder="Search…"
      /> */}
            <SearchBarInput
              type="text"
              value={maxPrice}
              onChange={onChangePrice}
              placeholder="금액 상한선 (원)"
            />
            {/* <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              onChange={onChangePrice}
            /> */}
          </FormGroup>
        </FilterBox>
      </SortBox>
    </SearchContainer>
  );
}

export default SearchBar;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiIconButton-label": {
      color: "white",
    },
  },
}));
const SearchContainer = styled.div`
  background: rgb(25, 29, 45);
  height: 50px;
`;

const SearchBarInput = styled.input`
  background-color: rgba(103, 193, 245, 0.2);
  color: #fff;
  border-radius: 3px;
  padding: 5px 10px;
  margin: 10px;
  outline-style: none;
  border: none;
  height: 20px;
`;

const SearchBtn = styled.button`
  height: 25px;
  margin-left: 5px;
  border-radius: 2px;
  border: none;
  padding: 1px;
  display: inline-block;
  cursor: pointer;
  text-decoration: none !important;
  color: #67c1f5 !important;
  background: rgba(103, 193, 245, 0.2);
`;

const SearchBtnSpan = styled.span`
  padding: 0 10px;
  font-size: 12px;
  line-height: 20px;
`;

const SortBox = styled.div`
  float: right;
  height: 20px;
  line-height: 45px;
`;

const FilterBox = styled.div`
  display: inline-block;
  margin-right: 20px;
  color: white;
`;
