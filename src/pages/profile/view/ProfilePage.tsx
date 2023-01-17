import { useState } from "react";

import { useAppSelector } from "../../../hooks/reduxHook";
import LoggedIn from "../components/LoggedIn";
import { RootState } from "../../../redux/store";
import SignIn from "../components/SignIn";
import CreateAccount from "../components/CreateAccount";

const ProfilePage = () => {
  const userState = useAppSelector((state: RootState) => {
    return state.userReducer;
  });

  const [signInCreateUserToggle, setSignInCreateUserToggle] =
    useState<boolean>(false);

  const handleToggle = () => {
    setSignInCreateUserToggle(!signInCreateUserToggle);
  };

  return (
    <div className="container">
      {userState.tokens.access_token ? (
        <LoggedIn></LoggedIn>
      ) : (
        <div>
          {signInCreateUserToggle ? (
            <SignIn handleToggle={handleToggle}></SignIn>
          ) : (
            <CreateAccount handleToggle={handleToggle}></CreateAccount>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
