import "./navbar.scss";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const Navbar = () => {
  const [userData, setUserData] = useState({
    id: 0,
    f_name: "",
    l_name: "",
    company_name: "",
    email: "",
    password: "",
    phone_number: 0,
  });

  useEffect(() => {
    const userCookie = Cookies.get("user");
    console.log(userCookie)
    if (userCookie) {
      const parsedUserData = JSON.parse(decodeURIComponent(userCookie));
      setUserData(parsedUserData);
    }
  }, []);



  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>invent</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="icon" />
        <img src="/app.svg" alt="icon" />
        <img src="/expand.svg" alt="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img
            src="https://i.pinimg.com/736x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg"
            alt=""
          />
          <span>
            {userData.f_name}  {userData.l_name}
          </span>
        </div>

        <img src="/setting.svg" alt="icon" />
      </div>
    </div>
  );
};
export default Navbar;
