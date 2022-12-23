export function storeCurrentUser(user) {
    localStorage.setItem("currentUser", user);
  }
  export function storeUserToken(token) {
    localStorage.setItem("token", token);
  }
  
  export function getCurrentUser() {
    const user = localStorage.getItem("currentUser");
    return user;
  }
  export function getCurrentToken() {
    const user = localStorage.getItem("token");
    return user;
  }
  
  export function clearCurrentUserAndToken() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  }