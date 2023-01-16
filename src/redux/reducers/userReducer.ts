import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { JwtTokenProp } from "../../interfaces/JwtTokenProp";
import { LoginProp } from "../../interfaces/LoginProp";
import { NewUserProp } from "../../interfaces/NewUserProp";
import { UserReducerStateProp } from "../../interfaces/UserReducerStateProp";

const initialState: UserReducerStateProp = {
  tokens: { access_token: "", refresh_token: "" },
  isLoggedIn: false,
  user: undefined,
  alert: { type: "info", message: "" },
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
    displayAlert: (state) => {
      if (state.alert.type === "success") {
        toast.success(state.alert.message);
      } else if (state.alert.type === "error") {
        toast.error(state.alert.message);
      } else {
        toast.info(state.alert.message);
      }
    },
  },
  extraReducers: (build) => {
    build.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload) {
        const newState: UserReducerStateProp = {
          ...state,
          alert: { type: "success", message: "Login successful" },
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
        alert: { type: "error", message: "Login failed" },
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
        alert: { type: "info", message: "Session expired" },
        isLoggedIn: false,
        user: undefined,
      };
      return newState;
    });
    build.addCase(createUser.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
      }
      return {
        ...state,
        alert: { type: "success", message: "User created successful" },
      };
    });
    build.addCase(createUser.pending, (state, action) => {
      return state;
    });
    build.addCase(createUser.rejected, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
      }
      return {
        ...state,
        alert: { type: "error", message: "User creation failed" },
      };
    });
  },
});

const userReducer = userSlice.reducer;
export const { logout, displayAlert } = userSlice.actions;
export default userReducer;
