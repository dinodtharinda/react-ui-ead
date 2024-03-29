import "./navbar.scss";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import React from "react";
import BasicMenu from "./MenuButton";
import { getData } from "../API/HttpService";
import { USER_BASE_URL } from "../../data";

export const Navbar = () => {
  const base = window.location.origin;
  const [userData, setUserData] = useState({
    id: 0,
    f_name: "",
    l_name: "",
    company_name: "",
    email: "",
    password: "",
    phone_number: 0,
  });


  const getUserDetails=()=>{

    const id = localStorage.getItem("user")

    getData(`${USER_BASE_URL}/api/v1/users/${id}`).then((res: any) => {
      if (res["status"]) {
        setUserData(res.data)
        Cookies.set("user", JSON.stringify(res.data), { expires: 1 / 24 });
      }
    });
  }

  useEffect(() => {
    const userCookie = Cookies.get("user");
    console.log(userCookie)
    if (userCookie) {
      const parsedUserData = JSON.parse(decodeURIComponent(userCookie));
      setUserData(parsedUserData);
    }else{
      getUserDetails();
    }
  }, []);







  return (
    <div className="navbar">
      <div className="logo">
        <img src={`${base}/logo.svg`} alt="" />
        <span>invent</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="icon" />
        {/* <img src="/app.svg" alt="icon" />
        <img src="/expand.svg" alt="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div> */}
 
        <BasicMenu name={userData.f_name+" "+userData.l_name}/>
      </div>
    </div>
  );
};
export default Navbar;
