import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import { useAppDispatcher, useAppSelector } from "../../../hooks/reduxHook";
import { UserReducerProp } from "../../../interfaces/UserReducerProp";
import { isUserLoggedIn, logout } from "../../../redux/reducers/userReducer";

const LoggedIn = () => {
  const userState: UserReducerProp = useAppSelector((state) => {
    return state.userReducer;
  });

  const dispatch = useAppDispatcher();

  useEffect(() => {
    dispatch(isUserLoggedIn(userState.tokens.access_token));
  }, [dispatch, userState.tokens.access_token]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {userState.user ? (
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
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
};

export default LoggedIn;
