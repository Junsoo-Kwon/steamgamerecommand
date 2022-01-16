import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { makeStyles, Tooltip, Button } from "@material-ui/core";

//opacity : 음영, ToolTip은 hover일 경우 설명창

const SelectableItem = (props) => {
  if (props.isDeselect) {
  }
  const [isSelected, setIsSelected] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const onSelectHandler = (e) => {
    setIsSelected(true);
    // e.target.style.opacity = "0.2";
    props.onSelectHandler(props); // 리스트에 추가
  };

  const onDeselectHandler = (e) => {
    setIsSelected(false);
    // e.target.style.opacity = "1";
    props.onDeselectHandler(props); //클릭한거 리스트에서 삭제
  };

  const onClickHandler = (e) => {
    isSelected ? onDeselectHandler(e) : onSelectHandler(e);
  };
  // 마우스를 컨텐츠 위에 올려놓으면
  const onHoverHandler = (e) => {
    setIsHover(true);
    if (!isSelected) {
      // e.target.style.opacity = "0.5";
    }
  };
  // 마우스가 컨텐츠 밖으로 나가면
  const onDisHoverHandler = (e) => {
    setIsHover(false);

    if (!isSelected) {
      // e.target.style.opacity = "1";
    }
  };
  const classes = useStyles(props.isDeselect);
  useEffect(() => {
    if (props.isDeselect) {
      setIsSelected(false);
    }
  }, [props.isDeselect]);
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
              className={
                isSelected
                  ? classes.opa02
                  : isHover
                  ? classes.opa05
                  : classes.opa1
              }
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
  gameImage: { width: "300px", height: "150px" },
  alignCenter: {
    alignItems: "center",
  },
  genreSpan: {
    // color: "#2d7096",
    color: "yellow",
  },
  opa05: {
    width: "300px",
    height: "150px",
    opacity: "0.5",
  },
  opa02: {
    width: "300px",
    height: "150px",
    opacity: "0.2",
  },
  opa1: {
    width: "300px",
    height: "150px",
    opacity: "1",
  },
}));

const ToolTipSpan = styled.span`
  font-size: 15px;
`;

export default SelectableItem;
