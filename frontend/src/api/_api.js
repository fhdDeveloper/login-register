
import axios from "axios";

// let responseData = await axios(config);
// return responseData; =>  :  return axios(config);

//Api:

// --------------------------------- Authentication Api
const Login = async (data) => {
  let config = {
    method: "post",
    url: "https://api.m3o.com/v1/user/Login",
    data: data,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + '$M3O_API_TOKEN'
    }
  };
  return axios(config);
};
const Logout = async (data) => {
  let config = {
    method: "post",
    url: "https://api.m3o.com/v1/user/Logout",
    data: data,
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios(config);
};



export {
  Login,
  Logout

};