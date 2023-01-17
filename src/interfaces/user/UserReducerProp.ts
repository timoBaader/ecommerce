import { JwtTokenProp } from "./JwtTokenProp";
import { UserProp } from "./UserProp";

export interface UserReducerProp {
  tokens: JwtTokenProp;
  user: UserProp | undefined;
}
