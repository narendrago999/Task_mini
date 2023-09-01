import React, { useEffect, useState } from "react";
import './Dashboard.css'
import Sidebar from "../sidebar/Sidebar";

const Dashboard: React.FC = () => {
  // const [data, setData] = useState({
  //   fname: "",
  //   lname: "",
  //   email: "",
  // });
  useEffect(() => {
    // const userData:string|undefined = Cookies.get('userData')
    // if(userData !== undefined){
    //   const user:string|null = localStorage.getItem(userData)
    //   if(user !== null){
    //     const userToJson = JSON.parse(user)
    //     setData(userToJson)
    //   }
    // }
  }, []);

  return (
    <>
      <Sidebar/>
    </>
  );
};

export default Dashboard;
