import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { JwtTokenProp } from "../../interfaces/user/JwtTokenProp";
import { LoginProp } from "../../interfaces/user/LoginProp";
import { NewUserProp } from "../../interfaces/user/NewUserProp";
import { UserReducerProp } from "../../interfaces/user/UserReducerProp";

const initialState: UserReducerProp = {
  tokens: { access_token: "", refresh_token: "" },
  user: undefined,
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
      throw err;
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: (build) => {
    build.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload) {
        const newState: UserReducerProp = {
          ...state,
          tokens: action.payload,
        };
        return newState;
      }
    });
    build.addCase(userLogin.pending, (state, action) => {
      return state;
    });
    build.addCase(userLogin.rejected, (state, action) => {
      const newState: UserReducerProp = {
        ...state,
        tokens: { access_token: "", refresh_token: "" },
        user: undefined,
      };
      toast.error("Login failed");
      return newState;
    });
    build.addCase(isUserLoggedIn.fulfilled, (state, action) => {
      if (action.payload) {
        const newState: UserReducerProp = {
          ...state,
          user: action.payload,
        };
        return newState;
      }
    });
    build.addCase(isUserLoggedIn.pending, (state, action) => {
      return state;
    });
    build.addCase(isUserLoggedIn.rejected, (state, action) => {
      const newState: UserReducerProp = {
        ...state,
        user: undefined,
      };
      return newState;
    });
    build.addCase(createUser.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
      }
      toast.success("User created successfully");
      return state;
    });
    build.addCase(createUser.pending, (state, action) => {
      return state;
    });
    build.addCase(createUser.rejected, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
      }
      toast.error("Failed to create user");
      return state;
    });
  },
});

const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;
export default userReducer;
