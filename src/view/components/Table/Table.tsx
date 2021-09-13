import { useState, useEffect } from "react";
import AddForm from "../AddForm/AddForm";
import BarChart from "../BarChart/BarChart";
import Row from "../Row/Row";
import style from "./style.module.css";

interface UsersI {
  userid: number;
  dateregistration: string;
  datelastactivity: string;
}

interface TableI {
  users: UsersI[];
}

const fakeData = [
  {
    userid: 1,
    dateregistration: "04.09.2021",
    datelastactivity: "08.09.2021",
  },
  {
    userid: 2,
    dateregistration: "06.09.2021",
    datelastactivity: "07.09.2021",
  },
  {
    userid: 3,
    dateregistration: "02.09.2021",
    datelastactivity: "10.09.2021",
  },
];






const Table = () => {
  const [isFormShown, setFormShown] = useState(false);
  const [isGraphShown, setGraphShown] = useState(false);
  const [users, setUsers] = useState<UsersI[]>(fakeData);
  const getLoginInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const jsonData = await response.json();
      setUsers(jsonData);
    } catch (error) {}
  };

  useEffect(() => {
    getLoginInfo();
  }, []);

  const Rows = users.map((user, index) => (
    <Row
      key={index}
      userid={user.userid}
      dateregistration={user.dateregistration}
      datelastactivity={user.datelastactivity}
    >
      {user}
    </Row>
  ));

  if (!isGraphShown) {
    return (
      <div className={style.grid_table}>
        <div className={style.table__style}>
          <div className={style.head__style}>
            <div className={style.grid_head}>
              <div>
                {" "}
                <div className={style.label}>userId</div>
              </div>
              <div>
                {" "}
                <div className={style.label}>dateRegistration</div>
              </div>
              <div>
                {" "}
                <div className={style.label}>dateLastActivity</div>
              </div>
            </div>
          </div>
          {Rows}
          {isFormShown ? (
            <AddForm
              closeFunction={() => setFormShown(false)}
              userid={users.length + 1}
            />
          ) : null}
          <div className={style.buttons}>
            {isFormShown ? (
              <button
                onClick={() => setFormShown(false)}
                className={style.button_cancel}
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setFormShown(true)}
                className={style.button_add}
              >
                Add
              </button>
            )}
            {isFormShown ? (
              <button className={style.button_calculate_disabled} disabled>
                Calculate
              </button>
            ) : (
              <button
                className={style.button_calculate}
                onClick={() => setGraphShown(true)}
              >
                Calculate
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.grid_table}>
        <div className={style.table__style}>
          <BarChart users = {users}/>
        </div>
      </div>
    );
  }
};

export default Table;
