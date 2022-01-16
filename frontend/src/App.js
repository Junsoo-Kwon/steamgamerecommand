import React, { useState, useEffect } from "react";
import { Header } from "component";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
// import { addSurvey, deleteSurvey } from "action/Survey";
import { updateAccount } from "action/User";

import {
  MainPage,
  SignInPage,
  SurveyPage,
  SearchPage,
  GenreListPage,
  GameInfoPage,
  CustomPage,
} from "page";

// import { RestrictRoute } from "component";
const userSelector = (state) => {
  return state.UserReducer.account;
};
const isEmptyObject = (obj) => {
  // 값이 {}인 경우
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("/auth/account").then((res) => {
      if (res.data.user) {
        dispatch(updateAccount(res.data.user));
      }
    });
  }, []);
  // acccount 접근 차단: survey랑 custom, account가 있는 경우: signin
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path={"/"} component={MainPage} />
        <Route exact path={"/signin"} component={SignInPage} />
        <Route exact path={"/survey"} component={SurveyPage} />
        <Route exact path={"/search/:name"} component={SearchPage} />
        <Route exact path={"/genre/:genre"} component={GenreListPage} />
        <Route exact path={"/info/:id"} component={GameInfoPage} />
        <Route exact path={"/usercustom"} component={CustomPage} />
      </Switch>
    </div>
  );
};

export default App;
