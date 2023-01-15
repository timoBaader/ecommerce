import { ErrorTypeProp } from "./ErrorTypeProp";
import { JwtTokenProp } from "./JwtTokenProp";
import { UserProp } from "./UserProp";

export interface UserReducerStateProp {
  tokens: JwtTokenProp;
  isLoggedIn: boolean;
  user: UserProp;
  error: {
    type: ErrorTypeProp;
    message: string;
  };
}
