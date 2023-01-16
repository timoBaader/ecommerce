import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useAppDispatcher, useAppSelector } from "../../../hooks/reduxHook";
import { createUser, userLogin } from "../../../redux/reducers/userReducer";
import LoggedIn from "../components/LoggedIn";
import { RootState } from "../../../redux/store";
import { LoginProp } from "../../../interfaces/LoginProp";
import { NewUserProp } from "../../../interfaces/NewUserProp";

const ProfilePage = () => {
  const [login, setLogin] = useState<LoginProp>({
    email: "",
    password: "",
  });
  const [newUserData, setNewUserData] = useState<NewUserProp>({
    name: "",
    email: "",
    password: "",
  });

  const userState = useAppSelector((state: RootState) => {
    return state.userReducer;
  });

  const dispatch = useAppDispatcher();

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(userLogin(login));
  };

  const submitCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUser(newUserData));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string
  ) => {
    e.preventDefault();
    if (type === "login")
      setLogin({ ...login, [e.target.name]: e.target.value });
    if (type === "create")
      setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      {userState.tokens.access_token ? (
        <LoggedIn></LoggedIn>
      ) : (
        <div>
          {/* LOGIN */}
          <Box component="form" onSubmit={submitLogin}>
            <Typography variant="h4">Login</Typography>
            <FormControl>
              <InputLabel htmlFor="email">email</InputLabel>
              <Input
                type="email"
                name="email"
                onChange={(e) => handleChange(e, "login")}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="password">password</InputLabel>
              <Input
                type="password"
                name="password"
                onChange={(e) => handleChange(e, "login")}
              />
            </FormControl>
            <Button type="submit">Submit</Button>
          </Box>
          {/* CREATE ACCOUNT */}
          <Box component="form" onSubmit={submitCreateUser}>
            <Typography variant="h4">Create Account</Typography>
            <FormControl>
              <InputLabel htmlFor="email">email</InputLabel>
              <Input
                type="email"
                name="email"
                onChange={(e) => handleChange(e, "create")}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="name">name</InputLabel>
              <Input
                type="name"
                name="name"
                onChange={(e) => handleChange(e, "create")}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="password">password</InputLabel>
              <Input
                type="password"
                name="password"
                onChange={(e) => handleChange(e, "create")}
              />
            </FormControl>
            <Button type="submit">Submit</Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
