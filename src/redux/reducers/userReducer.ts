import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { JwtTokenProp } from "../../interfaces/JwtTokenProp";
import { LoginProp } from "../../interfaces/LoginProp";
import { NewUserProp } from "../../interfaces/NewUserProp";
import { UserReducerStateProp } from "../../interfaces/UserReducerStateProp";

const initialState: UserReducerStateProp = {
  tokens: { access_token: "", refresh_token: "" },
  isLoggedIn: false,
  // should be undefined initially
  user: undefined,
  error: { type: { severity: "error" }, message: "" },
};

export const userLogin = createAsyncThunk(
  "userLogin",
  async (loginData: LoginProp) => {
    console.log("object");
    try {
      const response: AxiosResponse<JwtTokenProp, any> = await axios.post(
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
  async (newUserData: NewUserProp) => {
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
      state = initialState;
      return state;
    },
  },
  extraReducers: (build) => {
    build.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload) {
        console.log("User logged in");
        const newState: UserReducerStateProp = {
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
      const newState: UserReducerStateProp = {
        ...state,
        isLoggedIn: false,
        tokens: { access_token: "", refresh_token: "" },
        user: undefined,
      };
      return newState;
    });
    build.addCase(isUserLoggedIn.fulfilled, (state, action) => {
      if (action.payload) {
        console.log("User is still logged in");
        const newState: UserReducerStateProp = {
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
      const newState: UserReducerStateProp = {
        ...state,
        isLoggedIn: false,
        user: undefined,
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
          message: "",
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
