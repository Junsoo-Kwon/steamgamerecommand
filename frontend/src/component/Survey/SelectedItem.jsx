import React, { useState } from "react";
import styled from "styled-components";

import { makeStyles, Tooltip, Button } from "@material-ui/core";

//opacity : 음영, ToolTip은 hover일 경우 설명창

const SelectedItem = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const onSelectHandler = (e) => {
    setIsSelected(true);
    e.target.style.opacity = "0.2";
  };

  const onDeselectHandler = (e) => {
    setIsSelected(false);
    e.target.style.opacity = "1";
  };

  const onClickHandler = (e) => {
    props.onClickHandler(props);
  };
  // 마우스를 컨텐츠 위에 올려놓으면
  const onHoverHandler = (e) => {
    if (!isSelected) {
      e.target.style.opacity = "0.5";
    }
  };
  // 마우스가 컨텐츠 밖으로 나가면
  const onDisHoverHandler = (e) => {
    if (!isSelected) {
      e.target.style.opacity = "1";
    }
  };
  const classes = useStyles();
  return (
    <div>
      <div className={classes.alignCenter}>
        <Tooltip
          title={
            props.id ? (
              <>
                <ToolTipSpan>{props.name}</ToolTipSpan>
                <br />
                <ToolTipSpan className={classes.genreSpan}>
                  {props.genre}
                </ToolTipSpan>
              </>
            ) : (
              ""
            )
          }
          arrow
        >
          <Button>
            <img
              src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${props.id}/header.jpg`}
              className={classes.gameImage}
              alt=""
              onClick={onClickHandler}
              onMouseOver={onHoverHandler}
              onMouseOut={onDisHoverHandler}
            />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  gameImage: {
    width: "300px",
    height: "150px",
  },
  alignCenter: {
    alignItems: "center",
  },
  genreSpan: {
    // color: "#2d7096",
    color: "yellow",
  },
}));

const ToolTipSpan = styled.span`
  font-size: 15px;
`;

export default SelectedItem;
