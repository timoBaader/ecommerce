import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createUser } from "../../../redux/reducers/userReducer";
import { useAppDispatcher } from "../../../hooks/reduxHook";
import { toggleFunctionProp } from "../../../interfaces/profile/toggleFunctionProp";
import { NewUserProp } from "../../../interfaces/user/NewUserProp";

const CreateAccount = ({ handleToggle }: toggleFunctionProp) => {
  const [newUserData, setNewUserData] = useState<NewUserProp>({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useAppDispatcher();

  const submitCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUser(newUserData));
    handleToggle();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={submitCreateUser}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Account
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={() => handleToggle()}>
                Already have an account? Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateAccount;
