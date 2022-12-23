import React, { useEffect, useState, Fragment } from "react";
import { fetchUserData } from "../api";
import Remove from "./remove";
import Form from "./form";
import Edit from "./edit";

const Profile = ({
  userToken,
  currentUser,
  userPosts,
  setUserPosts,
  editPostId,
  setEditPostID,
}) => {
  const [userMessages, setUserMessages] = useState([]);

  useEffect(() => {
    async function getUserData() {
      const userInfo = await fetchUserData(userToken);
      setUserPosts(userInfo.posts);
      setUserMessages(userInfo.messages);
    }
    getUserData();
  }, []);

  return (
    <>
      <h1 className="welcomeHeadline">Hello, {currentUser}!</h1>
      <div className="form"> <Form
        userToken={userToken}
        setUserPosts={setUserPosts}
        userPosts={userPosts}
      /></div>
      <div id="profileContainer">
        <div id="allPosts">
          {userPosts && userPosts.length ? (
            userPosts.map((post, idx) => {
              let postId = post._id;
              let postTitle = post.title;
              let postDescription = post.description;
              let postPrice = post.price;
              let postLocation = post.location;
              let postDelivery = post.willDeliver;

              return (
                <Fragment key={`${idx}-${post.author}`}>
                  {post.active ? (
                    <div className="profilePosts">
                      <h2 style={{ paddingBottom: -5 }}>{postTitle}</h2>
                      <h3 style={{ paddingTop: 0 }}>
                        Posted by: {currentUser}
                      </h3>
                      <span>
                        {postLocation === "[On Request]"
                          ? null
                          : <><b>Location:</b> {postLocation}</>}
                      </span>
                      <p><b>Description:</b>{postDescription}</p>
                      <p><b>Price:</b> {postPrice}</p>
                      <span>
                        {postDelivery
                          ? <><b> Will deliver?: </b> Yes</> : <><b>Will deliver?:</b>No</>}
                      </span>
                      <div>
                        <>
                          {editPostId === postId ? (
                            <Edit
                              setEditPostID={setEditPostID}
                              postId={postId}
                              postTitle={postTitle}
                              postDescription={postDescription}
                              postPrice={postPrice}
                              postLocation={postLocation}
                              postDelivery={postDelivery}
                              setUserPosts={setUserPosts}
                              userPosts={userPosts}
                              userToken={userToken}
                              idx={idx}
                            />
                          ) : (
                            <p className="editRemoveButton">
                              <button
                                className="editButton"
                                value={postId}
                                onClick={() => {
                                  setEditPostID(postId);
                                }}
                              >
                                Edit
                              </button>
                              <Remove
                                postId={postId}
                                userToken={userToken}
                                setUserPosts={setUserPosts}
                              />
                            </p>
                          )}
                        </>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </Fragment>
              );
            })
          ) : (
            <>Post Something!</>
          )}
        </div>
        <div id="allMessages">
          {userMessages && userMessages.length ? (
            userMessages.map((post, idx) => {
              let title = post.post.title;
              let messangerName = post.fromUser.username;
              let messageContent = post.content;

              return (
                <Fragment key={`${idx}-${post._id}`}>
                  <div className="message">
                    <h2>Message From: {messangerName}</h2>
                    <h3>Re: {title}</h3>
                    <p>{messageContent}</p>
                  </div>
                </Fragment>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
