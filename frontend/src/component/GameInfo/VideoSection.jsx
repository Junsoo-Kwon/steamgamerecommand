import React from "react";
import styled from "styled-components";
// import ReactPlayer from "react-player";

import Typography from "@material-ui/core/Typography";

function VideoSection({ id }) {
  return (
    <Container>
      <TitleSection>
        {/* <Typography variant="h6" gutterBottom>
          게임 소개 영상
        </Typography> */}
        <Typography variant="h6" gutterBottom>
          게임 이미지
        </Typography>
      </TitleSection>
      <img
        src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/library_hero.jpg`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://postfiles.pstatic.net/MjAyMDEwMDZfMjY0/MDAxNjAxOTg5MjQyODg1.oTYsLrmQ-LkQzj5tJ6EsQXpKTV9yWVnRfBLJOwAtH00g.H9YyVVnkEAqacAEZhsWP3C6YUKWWA-MSw1ukNSKUySUg.PNG.dpfmxlfls95/noimage.png?type=w773";
        }}
        alt=""
        width="100%"
      />
      {/* <ReactPlayer
        url="https://cdn.cloudflare.steamstatic.com/steam/apps/256775534/movie480_vp9.webm?t=1596592514"
        width="100%"
        height="335px"
        controls
        // playing
        loop
      /> */}
    </Container>
  );
}

export default VideoSection;

const Container = styled.div`
  box-sizing: inherit;
  background: rgb(25, 29, 45);
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  /* @media (min-width: 981px) {
    width: 596px;
  } */
  @media (max-width: 1080px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const TitleSection = styled.div``;
