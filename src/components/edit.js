import React, { useState } from "react";
import { editPost } from "../api";

const Edit = ({
  postId,
  userToken,
  userPosts,
  setUserPosts,
  allPosts,
  setAllPosts,
  setEditPostID,
  postTitle,
  postDescription,
  postPrice,
  postLocation,
  postDelivery,
  idx,
}) => {
  const [title, setTitle] = useState(postTitle);
  const [description, setDescription] = useState(postDescription);
  const [price, setPrice] = useState(postPrice);
  const [location, setLocation] = useState(postLocation);
  const [delivery, setDelivery] = useState(postDelivery);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const editLocation = event.target.location.value;
    const editPostObj = {
      title: event.target.title.value,
      description: event.target.description.value,
      price: event.target.price.value,
      location: editLocation ? editLocation : "[On Request]",
      willDeliver: event.target.willDeliver.value,
    };

    const newPost = await editPost(editPostObj, postId, userToken);

    if (allPosts) {
      allPosts.splice(idx, 1, newPost);
      setAllPosts(allPosts);
      setEditPostID(null);
    } else {
      userPosts.splice(idx, 1, newPost);
      setUserPosts(userPosts);
      setEditPostID(null);
    }
  };

  return (
    <>
      <form id="newPost" onSubmit={handleSubmit}>
        <div id="userPostForm">
          <div>
            <label htmlFor="title">Title:</label>
            <input
              className="postBox"
              type="text"
              required
              name="title"
              placeholder="Required"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              className="postBox"
              type="text"
              required
              name="description"
              placeholder="Required"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              className="postBox"
              type="text"
              required
              name="price"
              placeholder="Required"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input
              className="postBox"
              type="text"
              name="location"
              placeholder="Optional"
              value={location === "[On Request]" ? "" : location}
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="willDeliver">Will you deliver it?</label>
            <select className="postBox" name="willDeliver">
              <option value={delivery}> {delivery ? "Yes" : "No"}</option>
              <option value={!delivery}>{!delivery ? "Yes" : "No"}</option>
            </select>
          </div>
          <button name="Post" type="submit">
            Submit
          </button>
        </div>
      </form>
      <button
        onClick={() => {
          setEditPostID(null);
        }}
      >
        Back
      </button>
    </>
  );
};

export default Edit;