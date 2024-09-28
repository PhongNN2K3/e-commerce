import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import errorReducer from "./error-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
  },
});
export default store;
