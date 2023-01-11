import { ErrorType } from "./ErrorType";
import { JwtToken } from "./jwtToken";
import { UserProp } from "./UserProp";

export interface UserReducerState {
  tokens: JwtToken;
  isLoggedIn: boolean;
  user: UserProp;
  error: {
    type: ErrorType;
    message: string;
  };
}
