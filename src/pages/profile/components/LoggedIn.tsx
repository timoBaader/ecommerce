import { Avatar, Button } from "@mui/material";
import React from "react";

import { useAppSelector } from "../../../hooks/reduxHook";
import { UserReducerState } from "../../../interfaces/UserReducerState";

const LoggedIn = () => {
  const userState: UserReducerState = useAppSelector((state) => {
    return state.userReducer;
  });

  return (
    <div>
      <Avatar alt="Profile image" src={userState.user.avatar} />
      <p>{userState.user.name}</p>
      <Button variant="contained">Logout</Button>
    </div>
  );
};

export default LoggedIn;
