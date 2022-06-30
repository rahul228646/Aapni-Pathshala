import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGOUT,
  REGISTERTEACHER_FAILURE,
  REGISTERTEACHER_SUCCESS
} from "./actionTypes";

// Load user
export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      console.log("hi");
      const res = await axios.get("http://localhost:5000/api/auth");
      console.log("res ",res);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      console.log("&&&&&7", err);
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
};

// add alert for each error later
// Register User
export const register = ({ name, email, password, standard }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password, standard });

    try {
      console.log("i am here");
      console.log(body);
      const res = await axios.post(
        "http://localhost:5000/api/user",
        body,
        config
      );
      console.log("now here");
      console.log(res);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      // const errors = err.response.data.errors;
      // if(errors){
      // dispatch alert for each error
      // }
      console.log(err);
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
};

export const registerTeacher = ({ name, email, password}) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      console.log("i am here");
      console.log(body);
      const res = await axios.post(
        "http://localhost:5000/api/teacher",
        body,
        config
      );
      console.log("now here");
      console.log(res);
      dispatch({
        type: REGISTERTEACHER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      // const errors = err.response.data.errors;
      // if(errors){
      // dispatch alert for each error
      // }
      console.log(err);
      dispatch({
        type: REGISTERTEACHER_FAILURE,
      });
    }
  };
};

// export function register(name, email, password, standard) {
//   return (dispatch) => {
//     const url = "http://localhost:5000/api/user";
//     fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: getFormBody({
//         name,
//         email,
//         password,
//         standard,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("data", data);
//         if (data.success) {
//           // dispatch action to save user
//           localStorage.setItem("token", data.data.token);
//           dispatch(signUpSuccess(data.data.user));
//           return;
//         }

//         dispatch(signUpFailed());
//       });
//   };
// }

// Login User
export const loginStudent = (email, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("http://localhost:5000/api/user/login", body, config);

    console.log(res);
     if(res.data==="No user exist")
     {
       const res2 = await axios.post("http://localhost:5000/api/teacher/login", body, config);

       if(res2.data==="No teacher exist")
       {
         dispatch({
           type: LOGIN_FAIL,
         });
       }
       else
       {
         dispatch({
           type: LOGIN_SUCCESS,
           payload: res2.data,
         });

         dispatch(loadUser());
       }
     }
     else
     {
       dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data,
       });

       dispatch(loadUser());
     }

    } catch (err) {
      // const errors = err.response.data.errors;
      // if(errors){
      // dispatch alert for each error
      // }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
};

// Login Teacher
export const loginTeacher = (email, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/teacher/login", body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      // const errors = err.response.data.errors;
      // if(errors){
      // dispatch alert for each error
      // }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
};

export const logout = () => (dispatch) => {
  setAuthToken(null);
  dispatch({ type: LOGOUT });
};
