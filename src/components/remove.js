import React from "react";
import { deletePost, fetchUserData, fectchAllPosts } from "../api";

const Remove = ({ postId, userToken, setUserPosts, allPosts, setAllPosts }) => {
  async function handleOnClick(event) {
    event.preventDefault();
    await deletePost(postId, userToken);

    if (allPosts) {
      const updatedPosts = await fectchAllPosts();
      setAllPosts(updatedPosts);
    } else {
      const updatedPosts = await fetchUserData(userToken);
      setUserPosts(updatedPosts.posts);
    }
  }
  return (
    <>
      <button onClick={handleOnClick}>Remove</button>
    </>
  );
};

export default Remove;