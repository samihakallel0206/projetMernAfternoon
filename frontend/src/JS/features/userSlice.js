import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getAllUsers = createAsyncThunk(
  "user-getAll",
  async (_, thunkAPI) => {
    try {
      const result = await api.get("/user/all");
      return result.data.listUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user-update", //le type
  async ({ id, userUpdated }, thunkAPI) => {
    try {
      const result = await api.put(`/user/${id}`, userUpdated);
      return result.data.user; //le payload dans le cas success
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // le payload dans le cas echec
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user-delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/user/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//Slice
const userSilce = createSlice({
  name: "user",
  initialState: {
    users: [],
    loadingUser: false,
    errors: null,
    success: null,
  },
  reducers: {
    clearUserError: (state) => {
      state.errors = null;
    },
    clearUserSuccess: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loadingUser = true;
        state.errors = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loadingUser = false;
        state.errors = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loadingUser = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loadingUser = false;
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) state.users[index] = action.payload;
        state.success = "User updated successfully!";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.errors = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loadingUser = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
        state.success = "User deleted successfully!";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.errors = action.payload;
      });
  },
});

export const { clearUserError, clearUserSuccess } = userSilce.actions;
export default userSilce.reducer;
