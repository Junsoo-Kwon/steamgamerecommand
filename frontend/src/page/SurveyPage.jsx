import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { makeStyles, Grid } from "@material-ui/core";
import swal from "sweetalert";
import axios from "axios";
import {
  SurveyGuide,
  SurveyList,
  SurveyButton,
  SurveyTitle,
  SelectedItem,
} from "component";
const userSelector = (state) => {
  return state.UserReducer.account;
};
const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
const SurveyPage = () => {
  const user = useSelector(userSelector);
  const classes = useStyles();
  const history = useHistory();
  let surveyedList = [];
  const [selectedList, setSelectedList] = useState([]);
  const [deselectedItem, setDelectedItem] = useState(null);

  const fetchSurveyList = async (userId) => {
    const result = await axios.get(`/api/user/mypage?uid=${userId}`);
    return result.data.gameinfolist;
  };
  const saveSurveyList = async () => {
    await fetchSurveyList(user.id).then((res) => {
      res.map((item) => surveyedList.push(item));
    });
  };
  const initSelectedList = async () => {
    await saveSurveyList().then(() => setSelectedList(surveyedList));
  };
  useEffect(() => {
    if (!isEmptyObject(user)) {
      initSelectedList();
    }
  }, [user]);

  const onSubmitHandler = (e) => {
    const data = {
      _id: user.id,
      _survey: true,
      survey_game_id: selectedList.map((item) => item.id),
    };
    axios.post("/api/user/survey", data).then((res) => {
      if (res.status === 200) {
        // return swal("", "저장이 완료되었습니다!");
        return swal({
          // title: "Wow!",
          text: "저장이 완료되었습니다!",
          type: "success",
        }).then(function () {
          history.push("/usercustom");
        });
      }
    });
  };

  const onSelectHandler = (clickedItem) => {
    const tempList = [];
    selectedList.map((item) => tempList.push(item));
    tempList.push(clickedItem);
    setSelectedList(tempList);

    setDelectedItem(null);
  };

  // 선택한 게임에서 클릭할때
  const onDeselectHandler = (clickedItem) => {
    const tempList = [];
    selectedList.map((item) =>
      item.id !== clickedItem.id ? tempList.push(item) : ""
    );
    setSelectedList(tempList);
    setDelectedItem(clickedItem);
  };
  return (
    <SurveyContainer>
      <Grid
        container
        className={classes.root}
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <GuideContainer>
            <SurveyGuide />
          </GuideContainer>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item>
          <TitleContainer>
            <SurveyTitle value="선택한 게임" />
          </TitleContainer>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={2}
            alignItems="center"
            className={classes.selectedList}
          >
            {selectedList
              ? selectedList.map((item, index) => (
                  <Grid item key={index}>
                    <SelectedItem
                      img={item.img}
                      id={item.id}
                      name={item.name}
                      genre={item.genre}
                      onClickHandler={onDeselectHandler}
                    />
                  </Grid>
                ))
              : ""}
          </Grid>
        </Grid>

        <Grid item>
          <TitleContainer>
            <SurveyTitle value="선택 가능한 게임" />
          </TitleContainer>
        </Grid>
        <Grid item>
          <SurveyList
            onSelectHandler={onSelectHandler}
            onDeselectHandler={onDeselectHandler}
            selectedList={selectedList}
            deselectedItem={deselectedItem}
          />
        </Grid>
      </Grid>
      <ButtonContainer>
        {selectedList ? (
          selectedList.length >= 3 ? (
            <SurveyButton value="저장" onClick={onSubmitHandler} />
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </ButtonContainer>
    </SurveyContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5),
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    flexGrow: 1,
  },
  selectedList: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(22),
    alignItems: "center",
  },
}));

const SurveyContainer = styled.div`
  background: rgb(26, 40, 56);
  padding: 20px 5px;
`;

const GuideContainer = styled.div`
  border: solid white 2px;
  padding: 30px 90px;
`;

const TitleContainer = styled.div`
  margin-top: 20px;
`;
const ButtonContainer = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
`;

export default SurveyPage;
