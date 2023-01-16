import { AlertProp } from "./AlertProp";
import { JwtTokenProp } from "./JwtTokenProp";
import { UserProp } from "./UserProp";

export interface UserReducerStateProp {
  tokens: JwtTokenProp;
  isLoggedIn: boolean;
  user: UserProp | undefined;
  alert: AlertProp;
}
