import React from "react";
import { makePost } from "../api";

const Form = ({ userToken, setUserPosts, userPosts }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const location = event.target.location.value;
    const willDeliver = event.target.willDeliver.value;
    const postObj = {
      title: event.target.title.value,
      description: event.target.description.value,
      price: event.target.price.value,
      location: location ? location : "[On Request]",
      willDeliver: willDeliver,
    };

    const newPost = await makePost(postObj, userToken);
    setUserPosts([...userPosts, newPost]);
    event.target.reset();
  };

  return (
    <>
      <div>
        <h2 className="newPost">New Post!</h2>
        <form id="newPost" onSubmit={handleSubmit}>
          <div id="userPostForm">
            <div>
              <label htmlFor="title">Title:</label>
              <input
                className="postBox1"
                type="text"
                required
                name="title"
                placeholder="Required"
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                className="postBox2"
                type="text"
                required
                name="description"
                placeholder="Required"
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                className="postBox3"
                type="text"
                required
                name="price"
                placeholder="Required"
              />
            </div>
            <div>
              <label htmlFor="location">Location:</label>
              <input
                className="postBox4"
                type="text"
                name="location"
                placeholder="Optional"
              />
            </div>
            <div>
              <label htmlFor="willDeliver">Will you deliver it?</label>
              <select className="postBox" name="willDeliver">
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            <button name="Post" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;