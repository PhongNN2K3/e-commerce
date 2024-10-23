import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to get all users
export const getAllUsers = createAsyncThunk("admin/getAllUsers", async () => {
  const response = await axios.get("http://localhost:5000/api/admin/user/get"); // Adjust this URL as needed
  return response.data.data; // Assuming the data comes in a "data" field
});

// Thunk to update a user's role
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ userId, role }) => {
    const response = await axios.put(
      "http://localhost:5000/api/admin/user/update-role",
      {
        userId,
        role,
      }
    );
    return response.data; // Assuming the updated user is returned in "data"
  }
);

const AdminUserSlice = createSlice({
  name: "adminUser",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      });
  },
});

export default AdminUserSlice.reducer;
