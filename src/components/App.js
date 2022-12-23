import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { fectchAllPosts } from "../api";
import { Posts, Header, Register, Profile } from ".";
import { getCurrentUser, getCurrentToken } from "../auth";

const App = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [userToken, setUserToken] = useState(getCurrentToken());
  const [userPosts, setUserPosts] = useState([]);
  const [editPostId, setEditPostID] = useState(null);
  const [messagePostId, setMessagePostId] = useState(null);

  useEffect(() => {
    fectchAllPosts()
      .then((posts) => {
        setAllPosts(posts);
      })
      .catch((error) => {
        console.error(error, "Something broke");
      });
  }, []);

  return (
    <>
      <Router>
        <Header
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          setUserToken={setUserToken}
          setMessagePostId={setMessagePostId}
        />
        <Routes>
          <Route
            exact
            path={"/"}
            element={
              <Posts
                allPosts={allPosts}
                userToken={userToken}
                currentUser={currentUser}
                setUserPosts={setUserPosts}
                setAllPosts={setAllPosts}
                editPostId={editPostId}
                setEditPostID={setEditPostID}
                messagePostId={messagePostId}
                setMessagePostId={setMessagePostId}
              />
            }
          ></Route>

          <Route
            path={"/register"}
            element={
              <Register
                setCurrentUser={setCurrentUser}
                setUserToken={setUserToken}
              />
            }
          ></Route>

          <Route
            path={"/profile"}
            element={
              <Profile
                userToken={userToken}
                currentUser={currentUser}
                userPosts={userPosts}
                setUserPosts={setUserPosts}
                editPostId={editPostId}
                setEditPostID={setEditPostID}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
