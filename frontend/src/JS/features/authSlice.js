import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

//actions
// ---------------------Register-------------------
export const register = createAsyncThunk(
  "auth-register",
  async (newUser, thunkAPI) => {
    try {
      const result = await api.post("/auth/register", newUser);
      return { message: result.data.message };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);
// ---------------------Login--------------------------

export const login = createAsyncThunk(
  "auth-login",
  async ({ email, password, navigate }, thunkAPI) => {
    try {  //api = http://localhost:4500/api (axios)
      console.log({email,password})
      const result = await api.post("/auth/login", { email, password });      
      // console.log(result);
      const user = result.data.user;
      if (user.role.titre === "ADMIN") {
        navigate("/admin/dashboard")
      }
      else {
        navigate("/unauthorized")
      }
      return {
        user,
        message: result.data.message,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);
// --------------------------------Logout---------------------

export const logout = createAsyncThunk("auth-logout", async (_, thunkAPI) => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});
// ---------------------------Current---------------------------

export const current = createAsyncThunk("auth-current", async (_, thunkAPI) => {
  try {
    const result = await api.get("/auth/current");
    return result.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

//Reducer
// -------------------------Slice-------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    errors: null,
    success: null,
    initializing: false,
  },
  reducers: {
    clearErrors: (state) => {
      state.errors = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (build) => {
    //register
    build
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.errors = null;
        state.success = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    //login
    build
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.errors = null;
        state.success = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    //logout
    build.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });

    // current
    build
      .addCase(current.pending, (state) => {
        state.initializing = true;
      })
      .addCase(current.fulfilled, (state, action) => {
        state.initializing = false;
        state.user = action.payload;
      })
      .addCase(current.rejected, (state) => {
        state.initializing = false;
        state.user = null;
      });
  },
});

export const { clearSuccess, clearErrors } = authSlice.actions;

export default authSlice.reducer;
