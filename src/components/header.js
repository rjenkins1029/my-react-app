import React from "react";
import { clearCurrentUserAndToken } from "../auth";
import { NavLink } from "react-router-dom";
import LogIn from "./login";

const Header = ({
  currentUser,
  setCurrentUser,
  setUserToken,
  setMessagePostId,
}) => {
  return (
    <>
      <div id="navBar">
        <NavLink className={"navBar"} to={"/"}>
          Home
        </NavLink>
        {currentUser ? (
          <NavLink className={"navBar"} to={"/Profile"}>
            Profile
          </NavLink>
        ) : (
          <NavLink
            className={"navBar"}
            to={"/"}
            onClick={() => {
              alert("Please log in to view");
            }}
          >
            Profile
          </NavLink>
        )}
        {currentUser ? (
          <NavLink
            className={"navBar"}
            to={"/"}
            onClick={() => {
              clearCurrentUserAndToken();
              setCurrentUser("");
              setUserToken("");
              setMessagePostId(null);
            }}
          >
            Logout
          </NavLink>
        ) : (
          <></>
        )}
      </div>
      {currentUser ? (
        <></>
      ) : (
        <LogIn
          setCurrentUser={setCurrentUser}
          setUserToken={setUserToken}
        />
      )}
    </>
  );
};

export default Header;
