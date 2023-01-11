import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Product } from "./product";

export interface IActionAreaCard {
  product: Product;
  userRole: string;
}
