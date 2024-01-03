import React, { FormEvent, useContext, useEffect, useState } from "react";
import "./SignIn.scss";
import { AuthContext } from "../../context/authContext";
import { Types } from "../../context/types";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const { signIn, Ok, loader } = useContext(AuthContext) as Types;
  const [UserName, setUserName] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    signIn(UserName, Password);
    clearFields();
  };

  useEffect(() => {
    if (Ok) {
      navigate("home");
    }
  }, [Ok]);
  const clearFields = (): void => {
    setUserName("");
    setPassword("");
  };
  const visiblePassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    setVisible(!visible);
  };
  return (
    <div className="login">
      <div className="container">
        <form action="" onSubmit={handleSubmit}>
          <h1>Welcome</h1>
          <input
            type="text"
            placeholder="ID"
            value={UserName}
            className="id"
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className="pass">
            <input
              type={visible ? "text" : "password"}
              placeholder="Password"
              value={Password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button id="btn" onClick={visiblePassword}>
              {!visible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
          <a href="">Forgot Password</a>
          <button className="submit" id="btn-submit">
            {loader ? <span className="loader"></span> : "Login"}
          </button>
        </form>

        <div className="other">
          <div className="line"></div>
          <div className="middle"> Or </div>
          <div className="line"></div>
        </div>
        <div className="moodle">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Moodle-logo.svg/1024px-Moodle-logo.svg.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
