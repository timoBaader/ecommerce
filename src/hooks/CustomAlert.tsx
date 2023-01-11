import Alert from "@mui/material/Alert";
import { ErrorType } from "../interfaces/ErrorType";

export const CustomAlert = ({ severity }: ErrorType, message: string) => {
  return (
    <Alert variant="filled" severity={severity}>
      {message}
    </Alert>
  );
};
