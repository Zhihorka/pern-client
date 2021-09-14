import React, { useState } from "react";
import style from "./style.module.css";

interface UserI {
    userid: number;
    dateregistration: string;
    datelastactivity: string;
}


interface EditFormI {
  closeFunction: () => any;
  user: UserI;
}

const formatDate = (date: String) => {
  return date.slice(8, 10) + "." + date.slice(5, 7) + "." + date.slice(0, 4);
};

const editUser = async (
  userid: number,
  dateregistration: string,
  datelastactivity: string,
  closeFunction: () => any
) => {
  if (dateregistration.length === 10 && datelastactivity.length === 10) {
    try {
      const body = { userid, dateregistration, datelastactivity };
      const editUser = await fetch(`http://localhost:5000/users${userid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location.href = "/";
      closeFunction();
    } catch (error) {}
  } else {
    alert("Проверьте правильность введеных данных !");
  }
};

const EditForm: React.FC<EditFormI> = ({ closeFunction, user  }) => {
    
  const [dateRegistration, setDateRegistration] = useState(user.dateregistration);
  const [dateLastActivity, setDateLastActivity] = useState(user.datelastactivity);
  const changeRegistration = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDateRegistration(event.target.value);
  };
  const changeLastActivity = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDateLastActivity(event.target.value);
  };
  return (
    <div className={style.row__style}>
      <div className={style.grid_row}>
        <div className={style.label}>
          <p className={style.label_id}>{user.userid}</p>
        </div>
        <div className={style.label}>
          <input
            type="date"
            value={dateRegistration}
            className={style.input}
            onChange={changeRegistration}
          />
        </div>
        <div className={style.label}>
          <input
            type="date"
            value={dateLastActivity}
            className={style.input}
            onChange={changeLastActivity}
          />
        </div>
        <div className={style.delete}>
          <button
            onClick={() =>
              editUser(
                user.userid,
                formatDate(dateRegistration.toString()),
                formatDate(dateLastActivity.toString()),

                closeFunction
              )
            }
            className={style.button_add}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
