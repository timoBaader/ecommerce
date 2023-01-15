import Alert from "@mui/material/Alert";

import { ErrorTypeProp } from "../interfaces/ErrorTypeProp";

export const CustomAlert = ({ severity }: ErrorTypeProp, message: string) => {
  return (
    <Alert variant="filled" severity={severity}>
      {message}
    </Alert>
  );
};
