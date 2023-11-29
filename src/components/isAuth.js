const isAuth = () => {
    return localStorage.getItem("token");
  };
  
  export const userType = () => {
    return localStorage.getItem("role");
  };
  
  export default isAuth;