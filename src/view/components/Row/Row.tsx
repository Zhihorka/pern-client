import React from "react";
import style from "./style.module.css";


interface UsersI {
    userid: number;
    dateregistration: string;
    datelastactivity: string;
}


const deleteUser = async (userid: number) =>{
  try {
    const deleteUser = await fetch(`http://localhost:5000/users/${userid}`,{
      method: "DELETE"
    });
  } catch (error) {
    
  }
}

const Row: React.FC<UsersI>= ({userid, dateregistration, datelastactivity}) => {

    return(
      <div className={style.row__style}>
      <div className={style.grid_row}>
       
        <div className={style.label}>
        {userid}
        </div>
        <div className={style.label}>
        {dateregistration}
        </div>
        <div className={style.label}>
        {datelastactivity}
        </div>
        <div className={style.delete}>
          <button onClick = {()=>{deleteUser(userid)}}>Х</button>
        </div>
        </div>
      </div>
    );
};


export default Row;