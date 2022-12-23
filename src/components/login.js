import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { storeCurrentUser, storeUserToken } from "../auth";
import { logInPerson } from "../api";

const LogIn = ({ setCurrentUser, setUserToken }) => {
    let navigate = useNavigate();
    function resetForm() {
        document.getElementById("userInput").reset();
    }
  return (
    <>
      <form
        id="userInput"
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await logInPerson(event);
          if (result.success) {
            const userToken = result.data.token
          setCurrentUser(event.target.username.value);
          setUserToken(userToken);
          storeCurrentUser(event.target.username.value);
          storeUserToken(userToken);
          navigate("/")
          } else {
           alert(result.error.message);
           resetForm()
          }
          
        }}
      >
        <span>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" placeholder="Username" />
          <label htmlFor="password">Password:</label>
          <input type="text" name="password" placeholder="Password" />
          <button name="logIn">Log In</button>
        </span>
        <NavLink to={"/register"}>Don't have a log in? Register here!</NavLink>
      </form>
    </>
  );
};

export default LogIn;