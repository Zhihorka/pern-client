
import React,{ useState } from "react";
import { BooleanLiteral } from "typescript";
import EditForm from "../EditForm/EditForm";
import style from "./style.module.css";


interface UserI {
    userid: number;
    dateregistration: string;
    datelastactivity: string;
}

interface RowI {
  user: UserI;
}



const deleteUser = async (userid: number) =>{
  try {
    const deleteUser = await fetch(`http://localhost:5000/users/${userid}`,{
      method: "DELETE"
    });
  } catch (error) {
    
  }
}

const Row: React.FC<RowI>= ({user}) => {
  const [isEditFormShown, setEditFormShown] = useState(false);
if (!isEditFormShown){
    return(
      <div className={style.row__style}>
      <div className={style.grid_row}>
       
        <div className={style.label}>
        {user.userid}
        </div>
        <div className={style.label}>
        {user.dateregistration}
        </div>
        <div className={style.label}>
        {user.datelastactivity}
        </div>
        <div className={style.edit}>
          <button onClick = {() => setEditFormShown(true)}>Edit</button>
        </div>
        <div className={style.delete}>
          <button onClick = {()=>deleteUser(user.userid)}>Х</button>
        </div>
        </div>
      </div>
    );
}else{
  return <EditForm user = {user} closeFunction = {()=>setEditFormShown(false)}/>
}
};


export default Row;