import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { JwtToken } from "../../interfaces/jwtToken";
import { login } from "../../interfaces/login";
import { NewUser } from "../../interfaces/NewUser";
import { UserReducerState } from "../../interfaces/UserReducerState";

const initialState: UserReducerState = {
  tokens: { access_token: "", refresh_token: "" },
  isLoggedIn: false,
  // should be undefined initially
  user: {
    id: -1,
    email: "",
    password: "",
    name: "",
    role: "",
    avatar: "",
  },
  error: { type: { severity: "error" }, message: "" },
};

export const userLogin = createAsyncThunk(
  "userLogin",
  async (loginData: login) => {
    console.log("object");
    try {
      const response: AxiosResponse<JwtToken, any> = await axios.post(
        process.env.REACT_APP_URL + "auth/login",
        loginData
      );
      return response.data;
    } catch (err: any) {
      console.log(err.message);
      throw err;
    }
  }
);

export const isUserLoggedIn = createAsyncThunk(
  "isUserLoggedIn",
  async (access_token: string) => {
    const headers = {
      Authorization: "Bearer " + access_token,
    };
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "auth/profile",
        { headers }
      );
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      console.log(err.message);
      throw err;
    }
  }
);

export const createUser = createAsyncThunk(
  "createUser",
  async (newUserData: NewUser) => {
    console.log(newUserData);
    try {
      const response = await axios.post(process.env.REACT_APP_URL + "users/", {
        email: newUserData.email,
        name: newUserData.name,
        password: newUserData.password,
        avatar: "https://picsum.photos/200",
      });
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      console.log(err.message);
      console.log(err);
      throw err;
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    clearAlert: (state) => {
      state.error.message = "";
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.tokens.access_token = "";
      state.tokens.refresh_token = "";
      state.user.avatar = "";
      state.user.email = "";
      state.user.id = -1;
      state.user.name = "";
      state.user.password = "";
      state.user.role = "";
    },
  },
  extraReducers: (build) => {
    build.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload) {
        console.log("User logged in");
        const newState: UserReducerState = {
          ...state,
          tokens: action.payload,
          isLoggedIn: true,
        };
        return newState;
      }
    });
    build.addCase(userLogin.pending, (state, action) => {
      return state;
    });
    build.addCase(userLogin.rejected, (state, action) => {
      console.log("Login failed");
      const newState: UserReducerState = {
        ...state,
        isLoggedIn: false,
        tokens: { access_token: "", refresh_token: "" },
        user: {
          id: -1,
          name: "",
          email: "",
          password: "",
          avatar: "",
          role: "",
        },
      };
      return newState;
    });
    build.addCase(isUserLoggedIn.fulfilled, (state, action) => {
      if (action.payload) {
        console.log("User is still logged in");
        const newState: UserReducerState = {
          ...state,
          isLoggedIn: true,
          user: action.payload,
        };
        return newState;
      }
    });
    build.addCase(isUserLoggedIn.pending, (state, action) => {
      return state;
    });
    build.addCase(isUserLoggedIn.rejected, (state, action) => {
      console.log("User session has expired");
      const newState: UserReducerState = {
        ...state,
        isLoggedIn: false,
        user: {
          id: -1,
          email: "",
          password: "",
          name: "",
          role: "",
          avatar: "",
        },
      };
      return newState;
    });
    build.addCase(createUser.fulfilled, (state, action) => {
      console.log("User created");
      if (action.payload) {
        console.log(action.payload);
      }
      return {
        ...state,
        error: {
          type: { severity: "success" },
          message: "User created successfully",
        },
      };
    });
    build.addCase(createUser.pending, (state, action) => {
      return state;
    });
    build.addCase(createUser.rejected, (state, action) => {
      console.log("User creation failed");
      if (action.payload) {
        console.log(action.payload);
      }
      return state;
    });
  },
});

const userReducer = userSlice.reducer;
export const { clearAlert, logout } = userSlice.actions;
export default userReducer;
