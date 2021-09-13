import React, { useState } from "react";
import style from "./style.module.css";

interface MetricsI {
  closeFunction: () => any;
  rollingRetention7day: number;
}

const Metrics: React.FC<MetricsI> = ({rollingRetention7day}) => {

  return (
    <div className={style.metrics_styled}>
        <div className={style.metric}>{rollingRetention7day}</div>
    </div>
  );
};

export default Metrics;
