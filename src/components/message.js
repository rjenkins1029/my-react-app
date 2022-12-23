import React from "react";
import { makeMessage } from "../api";

const Message = ({ postId, userToken, setMessagePostId }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    let message = event.target.message.value;
    message.length < 500
      ? makeMessage(postId, userToken, message)
      : alert("Too Many Characters");

    event.target.reset();
    setMessagePostId(null);
  };
  return (
    <span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Message">Message:</label>
        <input
          className="messageBox"
          type="text"
          required
          name="message"
          placeholder="Max 500 characters"
        />
        <button name="Submit" type="submit">
          Submit
        </button>
      </form>
      <button
        onClick={() => {
          setMessagePostId(null);
        }}
      >
        Back
      </button>
    </span>
  );
};

export default Message;