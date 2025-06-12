import {
  LOGOUT,
  AUTH,
  FETCH_USER_ID,
  FETCH_USER,
  UPDATE_USER,
} from "../constants/actionType";
import Cookies from "js-cookie";
const auth = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      console.log(action?.payload?.token, "This is token for cookies");
      Cookies.set("token", action?.payload?.token, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
      });
      return {
        ...state,
        authData: action.payload,
        loading: false,
        errors: null,
      };

    case LOGOUT:
      localStorage.clear();
      Cookies.remove("token");
      return { ...state, authData: null, loading: false, errors: null };

    case FETCH_USER:
      return {
        ...state,
        authData: action.payload,
      };

    case UPDATE_USER:
      // localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            ...action.payload,
          },
        },
      };

    case FETCH_USER_ID:
      return [action.payload];

    default:
      return state;
  }
};

export default auth;
