import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { CreateProductProp } from "../../interfaces/CreateProductProp";
import { ProductProp } from "../../interfaces/ProductProp";
import { UpdateProductProp } from "../../interfaces/UpdateProductProp";

const initialState: ProductProp[] = [];

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const jsonData = await fetch(process.env.REACT_APP_URL + "products");
      const data: ProductProp[] | Error = await jsonData.json();
      return data;
    } catch (err: any) {
      console.log(err.message);
      throw err;
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProduct",
  async (id: number) => {
    try {
      const jsonData = await fetch(
        process.env.REACT_APP_URL + "products/" + id
      );
      const data: ProductProp = await jsonData.json();
      const dataArray: ProductProp[] = [data];
      console.log(dataArray);
      return dataArray;
    } catch (err: any) {
      console.log(err.message);
      throw err;
    }
  }
);

export const deleteSingleProduct = createAsyncThunk(
  "deleteSingleProduct",
  async (id: number) => {
    try {
      const response: AxiosResponse<boolean, any> = await axios.delete(
        process.env.REACT_APP_URL + "products/" + id
      );
      console.log(response);
      return response;
    } catch (err: any) {
      console.log(err.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (data: UpdateProductProp) => {
    try {
      const response = await axios.put(
        process.env.REACT_APP_URL + "products/" + data.id,
        data
      );
      console.log(response);
      return response;
    } catch (err: any) {
      console.log(err.message);
      throw err;
    }
  }
);

export const createProduct = createAsyncThunk(
  "createProduct",
  async (product: CreateProductProp) => {
    try {
      const response: AxiosResponse<ProductProp, any> = await axios.post(
        process.env.REACT_APP_URL + "products",
        product
      );
      return response.data;
    } catch (err: any) {
      console.log(err);
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {
    sortByName: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.sort((a, b) => b.title.localeCompare(a.title));
      } else {
        state.sort((a, b) => a.title.localeCompare(b.title));
      }
    },
    sortByCategory: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.sort((a, b) => a.category.name.localeCompare(b.category.name));
      } else {
        state.sort((a, b) => b.category.name.localeCompare(a.category.name));
      }
    },
    sortByPrice: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.sort((a, b) => a.price - b.price);
      } else {
        state.sort((a, b) => b.price - a.price);
      }
    },
  },
  extraReducers: (build) => {
    /* FETCH ALL PRODUCTS */
    build.addCase(fetchAllProducts.fulfilled, (state, action) => {
      console.log("No Error");
      if (action.payload && "message" in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      } else {
        return action.payload;
      }
    });
    build.addCase(fetchAllProducts.rejected, (state, action) => {
      console.log("Error fetching data");
      return state;
    });
    build.addCase(fetchAllProducts.pending, (state, action) => {
      return state;
    });
    /* CREATE PRODUCT */
    build.addCase(createProduct.fulfilled, (state, action) => {
      if (action.payload) {
        state.push(action.payload);
        console.log("Product created successfully");
      } else {
        return state;
      }
    });
    build.addCase(createProduct.pending, (state, action) => {
      return state;
    });
    build.addCase(createProduct.rejected, (state, action) => {
      console.log("Error creating product");
      return state;
    });
    /* FETCH SINGLE PRODUCT */
    build.addCase(fetchSingleProduct.rejected, (state, action) => {
      console.log("Error fetching data");
      return state;
    });
    build.addCase(fetchSingleProduct.pending, (state, action) => {
      return state;
    });
    build.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload;
      } else {
        return state;
      }
    });
    /* DELETE SINGLE PRODUCT */
    build.addCase(deleteSingleProduct.rejected, (state, action) => {
      console.log("Product could not be deleted");
      return state;
    });
    build.addCase(deleteSingleProduct.pending, (state, action) => {
      return state;
    });
    build.addCase(deleteSingleProduct.fulfilled, (state, action) => {
      console.log("Product deleted successfully");
      return state;
    });
    // UPDATE PRODUCT
    build.addCase(updateProduct.rejected, (state, action) => {
      console.log("Product could not be updated");
      return state;
    });
    build.addCase(updateProduct.pending, (state, action) => {
      return state;
    });
    build.addCase(updateProduct.fulfilled, (state, action) => {
      console.log("Product updated successfully");
      return state;
    });
  },
});

const productReducer = productSlice.reducer;
export const { sortByName, sortByCategory, sortByPrice } = productSlice.actions;
export default productReducer;
