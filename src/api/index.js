const BASE_URL = "https://strangers-things.herokuapp.com/api/";
const cohortName = "2209-FTB-PT-WEB-PT/";

export const fectchAllPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL + cohortName}posts/`);
    const result = await response.json();
    const postsData = result.data.posts;

    return postsData;
  } catch (error) {
    console.error(error, "something broke");
  }
};

export const fetchUserData = async (userToken) => {
  try {
    const response = await fetch(`${BASE_URL + cohortName}users/me/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    const result = await response.json();

    const userData = result.data;

    return userData;
  } catch (error) {
    console.error(error, "something broke");
  }
};

export const registerPerson = async (event) => {
  try {
    const response = await fetch(`${BASE_URL + cohortName}users/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${event.target.username.value}`,
          password: `${event.target.password.value}`,
        },
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const logInPerson = async (event) => {
  try {
    const response = await fetch(`${BASE_URL + cohortName}users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${event.target.username.value}`,
          password: `${event.target.password.value}`,
        },
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const makePost = async (post, userToken) => {
  try {
    const response = await fetch(`${BASE_URL + cohortName}posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        post,
      }),
    });

    const result = await response.json();
    return result.data.post;
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (postId, userToken) => {
  try {
    const response = await fetch(`${BASE_URL + cohortName}posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const editPost = async (post, postId, userToken) => {
  try {
    const response = await fetch(`${BASE_URL + cohortName}posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        post,
      }),
    });

    const result = await response.json();
    return result.data.post;
  } catch (error) {
    console.error(error);
  }
};

export const makeMessage = async (postId, userToken, message) => {
  try {
    const response = await fetch(
      `${BASE_URL + cohortName}posts/${postId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          message: {
            content: message,
          },
        }),
      }
    );

    const result = await response.json();
    return result.data.message;
  } catch (error) {
    console.error(error);
  }
};