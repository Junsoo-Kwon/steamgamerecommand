import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import logoimg from "../assets/img/logo.png";
import steamlogoimg from "../assets/img/steamlogo.png";
import axios from "axios";

const userSelector = (state) => {
  return state.UserReducer.account;
};
const isEmptyObject = (obj) => {
  // 값이 {}인 경우
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
function Header() {
  const user = useSelector(userSelector);
  const classes = useStyles();
  const history = useHistory();
  const [isSignIn, setIsSignIn] = useState(false);
  const [profile, setProfile] = useState(
    "https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/03/urbanbrush-20190305024253312336.png"
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  // 아이콘 메뉴 open
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // 아이콘 메뉴 close
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!isEmptyObject(user)) {
      setIsSignIn(true);
      setProfile(user.photos[2].value);
    }
    // axios.get("/auth/account").then((res) => {
    //   if (res.data.user) {
    //   }
    // });
  }, [user]);

  // 페이지 이동
  const mvPageHandler = (page) => (e) => {
    setAnchorEl(null);
    history.push(page);
  };

  // 로그아웃
  const signOutHandler = (e) => {
    setAnchorEl(null);
    if (typeof window !== "undefined") {
      window.location.href = "/auth/logout";
    }
    setIsSignIn(false);
  };

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

      history.push("/search/" + searchKeyword);
    }
  };

  return (
    <>
      <HeaderContainer>
        <Container>
          <Logo src={logoimg} onClick={mvPageHandler("/")} alt="" />
          <Ultag>
            <Litag
              className={isSignIn ? classes.searchLi : classes.searchLiShort}
            >
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={searchKeyword}
                  inputProps={{ "aria-label": "search" }}
                  onChange={searchChange}
                  onKeyUp={enterSearch}
                />
              </div>
            </Litag>
            <Litag>
              {isSignIn ? (
                <IconButton onClick={handleClick}>
                  <img src={`${profile}`} className={classes.avatar} alt="" />
                </IconButton>
              ) : (
                <Button
                  variant="contained"
                  className={classes.button}
                  endIcon={<Steamlogo src={steamlogoimg} />}
                  onClick={mvPageHandler("/signin")}
                >
                  Sign in
                </Button>
              )}
            </Litag>
          </Ultag>
        </Container>
      </HeaderContainer>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={mvPageHandler("/usercustom")}>
          <ListItemText primary="CustomPage" />
        </MenuItem>
        <MenuItem onClick={mvPageHandler("/survey")}>
          <ListItemText primary="My Favorite" />
        </MenuItem>
        <MenuItem onClick={signOutHandler}>
          <ListItemText primary="Sign Out" />
        </MenuItem>
      </StyledMenu>
    </>
  );
}

export default Header;

const HeaderContainer = styled.div`
  background: rgb(0, 0, 0);
  height: 60px;
  width: 100%;
  z-index: 10001;
  min-width: 960px;
  background-color: #000;
  transform: translateZ(0);
  backface-visibility: hidden;
  @media (max-width: 980px) {
    min-width: 0;
    width: 100vw;
  }
`;

const Container = styled.div`
  width: 960px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: auto;
  margin-left: auto;
  @media (max-width: 980px) {
    width: auto;
  }
`;

const Logo = styled.img`
  width: 50px;
  margin: 5px 0px;
  cursor: pointer;
`;

const Steamlogo = styled.img`
  width: 50px;
`;

const Ultag = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  float: right;
`;

const Litag = styled.li`
  border: 0;
  margin: 0;
  padding: 0;
  float: left;
  line-height: 45px;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    height: "50px",
    margin: "5px 0px 5px 20px",
    background: "black",
    color: "white",
    textTransform: "none",
    "&:hover": {
      background: "rgb(50,50,50)",
    },

    "& .MuiButton-label": {
      fontSize: "20px",
    },
    "@media (max-width: 600px)": {
      marginLeft: "0px",
    },
    "& .MuiButton-endIcon": {
      marginLeft: "15px",

      "@media (max-width: 600px)": {
        display: "none",
      },
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),

    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
    height: "45px",
    margin: "7px 10px",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    color: "white",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },

  linkText: {
    color: "white",
    textDecoration: "none",
    "&:visited": {
      color: "white",
    },
    "&:active": {
      color: "white",
    },
  },
  avatar: {
    width: "40px",
    height: "40px",
    display: "inline-block",
    overflow: "hidden",
    lineHeight: "1",
    verticalAlign: "middle",
    borderRadius: "6px",
  },
  searchLi: {
    width: "350px",
    "@media (max-width: 600px)": {
      width: "225px",
    },
  },
  searchLiShort: {
    "@media (max-width: 600px)": {
      width: "190px",
    },
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
