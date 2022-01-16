import React, { useState, useEffect, useRef } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

import SelectableItem from "./SelectableItem";

const compareGameObject = (a, b) => {
  return a.id === b.id;
};

const includesObject = (array, item) => {
  let result = false;
  array.map((i) => (compareGameObject(i, item) ? (result = true) : ""));
  return result;
};
const isEmptyArray = (arr) => {
  return arr.constructor === Array && arr.length === 0;
};
const SurveyList = (props) => {
  const selectedList = props.selectedList;
  const classes = useStyles();

  const pageno = useRef(1);
  // Todo : selectableList로 rename
  const [gameList, setGameList] = useState([]);

  const filterSelectedList = (fetchedGameList) => {
    return fetchedGameList.filter(
      (totalItem) => !includesObject(selectedList, totalItem)
    );
  };

  useEffect(() => {
    if (isEmptyArray(gameList)) {
      //&& !isEmptyArray(selectedList) 이걸 해야 로그인하고 is_survey가 true일때 filtering이 된다.....
      // 이유는 useEffect에서 selectedList가 시간이 조금 지나야지 받아올 수 있다...

      if (!isEmptyArray(selectedList)) {
        axios.get("/api/survey?pageno=0").then((res) => {
          const fectedList = res.data.content;
          const filteredList = filterSelectedList(fectedList);
          setGameList(filteredList);
        });
        // initGameList();
      } else {
        axios.get("/api/survey?pageno=0").then((res) => {
          const fectedList = res.data.content;
          setGameList(fectedList);
        });
        // initGameList();
      }
    }
  }, [selectedList]);

  const fetchMoreData = () => {
    setTimeout(() => {
      axios.get(`/api/survey?pageno=${pageno.current++}`).then((res) => {
        const filteredList = filterSelectedList(res.data.content);
        setGameList(gameList.concat(filteredList));
      });
    }, 1000);
  };

  return (
    <>
      <div className={classes.root}>
        <InfiniteScroll
          dataLength={gameList.length}
          next={fetchMoreData}
          hasMore={true}
          style={{ overflow: "hidden" }}
        >
          <Grid container spacing={2}>
            {gameList.map((gameItem, index) => (
              <Grid item key={index}>
                <SelectableItem
                  img={gameItem.img}
                  //
                  id={gameItem.id}
                  name={gameItem.name}
                  genre={gameItem.genre}
                  onSelectHandler={props.onSelectHandler}
                  onDeselectHandler={props.onDeselectHandler}
                  selectedList={props.selectedList}
                  isDeselect={
                    props.deselectedItem
                      ? props.deselectedItem.id === gameItem.id
                        ? true
                        : false
                      : false
                  }
                />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </div>
    </>
  );
};

/* css */
const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(22),
    alignItems: "center",
  },
}));

export default SurveyList;
