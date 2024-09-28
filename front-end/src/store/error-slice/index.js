import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../auth-slice";

const initialState = {
  error: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
