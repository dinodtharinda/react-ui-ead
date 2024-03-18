import { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { postData } from "../../components/API/HttpService";
import Cookies from "js-cookie";
import "../../data"
import { USER_BASE_URL } from "../../data";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e: any) => {
    e.preventDefault();
    postData(`${USER_BASE_URL}/api/v1/users/login`, { email: email, password: password })
      .then((res: any) => {
        if (res["status"]) {
          localStorage.setItem("authenticated", true.toString());
          localStorage.setItem("user", res.data.id.toString());
          Cookies.set("user", JSON.stringify(res.data), { expires: 1 / 24 });
        }
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div className="login-body">
      <div className="wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <div className="remember-forget">
            <label htmlFor="">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forget Password?</a>
          </div>
          <button type="submit" onClick={login}>
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account? <a href="">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// export default LoginForm;
