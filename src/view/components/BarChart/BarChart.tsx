import * as React from "react";
import Metrics from "../Metrics/Metrics";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import style from "./style.module.css";

interface UsersI {
  userid: number;
  dateregistration: string;
  datelastactivity: string;
}

interface ChartI {
  closeFunction: () => any;
  users: UsersI[];
}

const parseDate = (str: any) => {
  var mdy = str.split(".");
  return new Date(mdy[2], mdy[0] - 1, mdy[1]);
};

const datediff = (first: any, second: any) => {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
};

const formatDataForChart = (users: UsersI[]) => {
  const newData: any = [];
  users.forEach(function (user) {
    newData.push({
      lifespan:
        Math.floor(
          datediff(
            parseDate(user.dateregistration),
            parseDate(user.datelastactivity)
          ) / 24
        ) - 1,
      amount: 1,
    });
  });

  return newData;
};

const BarChart: React.FC<ChartI> = ({ closeFunction, users }) => {
  return (
    <div>
      <div className={style.chart_styled}>
        <Paper>
          <Chart data={formatDataForChart(users)}>
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries valueField="amount" argumentField="lifespan" />
            <Animation />
          </Chart>
        </Paper>
      </div>
      <Metrics
        closeFunction={closeFunction}
        usersLifespan={formatDataForChart(users)}
      />
    </div>
  );
};

export default BarChart;
