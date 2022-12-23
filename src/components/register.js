import React from "react";
import { registerPerson } from "../api";
import { storeCurrentUser, storeUserToken } from "../auth";
import { useNavigate } from "react-router-dom";

const Register = ({ setCurrentUser, setUserToken }) => {
  let navigate = useNavigate();
  function resetForm() {
    document.getElementById("userRegistration").reset();
  }
  return (
    <div id="registerForm">
      <form
        id="userRegistration"
        onSubmit={async (event) => {
          event.preventDefault();
          if (
            event.target.password.value !==
              event.target.passwordConfirmation.value ||
            event.target.password.value.length < 6 ||
            event.target.username.value.length < 6
          ) {
            alert(`Password did not match or reach the minimum length`);
            navigate("/register");
            resetForm();
          } else {
            const result = await registerPerson(event);
            if (result.success) {
              const userToken = result.data.token;
              setCurrentUser(event.target.username.value);
              setUserToken(userToken);
              storeCurrentUser(event.target.username.value);
              storeUserToken(userToken);
              navigate("/");
            } else {
              alert(result.error.message);
              navigate("/register");
              resetForm();
            }
          }
        }}
      >
        <div id="inputForm">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              className="inputBox1"
              type="text"
              required
              name="username"
              placeholder="Username (must be at least 6 characters)"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="inputBox2"
              type="text"
              required
              name="password"
              placeholder="Password (must be at least 6 characters)"
            />
          </div>
          <div>
            <label htmlFor="passwordConfirmation">Confirm Password:</label>
            <input
              className="inputBox3"
              type="text"
              required
              name="passwordConfirmation"
              placeholder="Confirm Password"
            />
          </div>
          <button name="Register" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;