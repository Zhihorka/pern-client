import React, { useState } from "react";
import style from "./style.module.css";

interface UsersLifespanI {
  lifespan: number;
  amount: number;
}

interface MetricsI {
  closeFunction: () => any;
  usersLifespan: UsersLifespanI[];
}

const rellingRetention = (
  usersLifespan: UsersLifespanI[],
  lifespan: number
) => {
  let userCount: number = 0;
  usersLifespan.forEach((user) => {
    if (user.lifespan >= lifespan) {
      userCount++;
    }
  });
  return userCount;
};

const Metrics: React.FC<MetricsI> = ({ closeFunction, usersLifespan }) => {
  const [lifespan, setLifespan] = useState("");
  const [approach, setApproach] = useState(0);
  const changeLifespan = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLifespan(event.target.value);
  };
  return (
    <div className={style.metrics_styled}>
      <p>{`Users with lifespan more than ${lifespan}`}</p>
      <div className={style.metric}>{approach}</div>
      <input value = {lifespan} onChange={changeLifespan} />
      <button
        onClick={() =>
          setApproach(rellingRetention(usersLifespan, Number(lifespan)))
        }
      >
        Relling Retention
      </button>
      <button onClick={closeFunction}>X</button>
    </div>
  );
};

export default Metrics;
