import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

import { useAppDispatcher, useAppSelector } from "../../../hooks/reduxHook";
import { UserReducerStateProp } from "../../../interfaces/UserReducerStateProp";
import { logout } from "../../../redux/reducers/userReducer";

const LoggedIn = () => {
  const userState: UserReducerStateProp = useAppSelector((state) => {
    return state.userReducer;
  });

  const dispatch = useAppDispatcher();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {userState.user && (
        <div>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={userState.user.avatar}
              title="profile image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {userState.user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Role: {userState.user.role}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {userState.user.email}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={() => handleLogout()}>
                Logout
              </Button>
            </CardActions>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoggedIn;
