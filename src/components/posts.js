import React, { useState, Fragment } from "react";
import Remove from "./remove";
import Edit from "./edit";
import Message from "./message";
import Search from "./search";

const Posts = ({
  allPosts,
  setAllPosts,
  currentUser,
  userToken,
  editPostId,
  setEditPostID,
  setMessagePostId,
  messagePostId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(null);

  const postsToDisplay = filteredPosts ? filteredPosts : allPosts;

  return (
    <>
      {currentUser ? (
        <h1 className="welcomeHeadline">Welcome back, {currentUser}!</h1>
      ) : (
        <></>
      )}
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        allPosts={allPosts}
        setFilteredPosts={setFilteredPosts}
      />
      <div id="postBox">
      {postsToDisplay && postsToDisplay.length ? (
        postsToDisplay.map((post, idx) => {
          let postId = post._id;
          let postTitle = post.title;
          let postDescription = post.description;
          let postPrice = post.price;
          let postLocation = post.location;
          let postDelivery = post.willDeliver;

          return (
            <Fragment key={`${idx}-${post.author}`}>
              {post.active ? (
                <div className="userPosts">
                  <h2>{postTitle}</h2>
                  <h3>Posted by: {post.author.username}</h3>
                  <span>
                    {postLocation === "[On Request]"
                      ? null
                      : <><b>Location:</b> {postLocation}</>}
                  </span>
                  <p> <b>Description:</b> {postDescription}</p>
                  <p> <b>Price:</b> {postPrice}</p>
                  <span>
                    {postDelivery ? <><b> Will deliver?: </b> Yes</> : <><b>Will deliver?:</b>No</>}
                  </span>
                  <>
                    {post.author.username === currentUser ? (
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
                              setAllPosts={setAllPosts}
                              allPosts={allPosts}
                              userToken={userToken}
                              idx={idx}
                            />
                          ) : (
                            <span>
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
                                setAllPosts={setAllPosts}
                                allPosts={allPosts}
                              />
                            </span>
                          )}
                        </>
                      </div>
                    ) : messagePostId === postId && currentUser ? (
                      <Message
                        postId={postId}
                        userToken={userToken}
                        setMessagePostId={setMessagePostId}
                      />
                    ) : currentUser ? (
                      <div className="postMessageButton">
                        <button
                          className="messageButton"
                          value={postId}
                          onClick={(event) => {
                            setMessagePostId(postId);
                          }}
                        >
                          Message
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                </div>
              ) : (
                <></>
              )}
            </Fragment>
          );
        })
      ) : (
        <></>
      )}
      </div>
    </>
  );
};

export default Posts;