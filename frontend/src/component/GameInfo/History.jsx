import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function History({ gamehistory }) {
  return (
    <Container>
      <SubContainer>
        <div>
          <Typography variant="h6" gutterBottom>
            할인 정보
          </Typography>
        </div>
        <Content>
          <ResponsiveContainer>
            <ComposedChart
              data={gamehistory}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                stackId="a"
                type="monotone"
                dataKey="discount"
                fill="#82ca9d"
              />
              <Line type="monotone" dataKey="price" stroke="rgb(34, 58, 76)" />
              <Line type="monotone" dataKey="name" stroke="rgb(34, 58, 76)" />
            </ComposedChart>
          </ResponsiveContainer>
        </Content>
      </SubContainer>
    </Container>
  );
}

export default History;

const Container = styled.div`
  color: #fff;
  box-sizing: inherit;
  background: rgb(25, 29, 45);
  width: 100%;
`;
const SubContainer = styled.div`
  padding: 10px;
`;

const Content = styled.div`
  background: rgb(34, 58, 76);
  width: 100%;
  height: 400px;
`;
