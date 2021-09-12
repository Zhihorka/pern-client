import React, { useState } from "react";
import style from "./style.module.css";

interface AddFormI {
  closeFunction: () => any;
  userId: number;
}

const formatDate = (date: String) => {
  return date.slice(8, 10) + "." + date.slice(5, 7) + "." + date.slice(0, 4);
};

const addUser = async (
  userId: number,
  dateRegistration: string,
  dateLastActivity: string,
  closeFunction: () => any
) => {
  if (dateRegistration.length === 10 && dateLastActivity.length === 10) {
    try {
      const body = { userId, dateRegistration, dateLastActivity };
      const addUser = await fetch("http://localhost:5000/users", {
        method: "POST",
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

const AddForm: React.FC<AddFormI> = ({ closeFunction, userId }) => {
  const [dateRegistration, setDateRegistration] = useState("");
  const [dateLastActivity, setDateLastActivity] = useState("");
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
          <p className={style.label_id}>{userId}</p>
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
              addUser(
                userId,
                formatDate(dateRegistration.toString()),
                formatDate(dateLastActivity.toString()),
                closeFunction
              )
            }
            className={style.button_add}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
