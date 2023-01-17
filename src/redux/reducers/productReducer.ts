import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { CreateProductProp } from "../../interfaces/product/CreateProductProp";
import { ProductProp } from "../../interfaces/product/ProductProp";
import { ProductReducerProp } from "../../interfaces/product/ProductReducerProp";
import { UpdateProductProp } from "../../interfaces/product/UpdateProductProp";

const initialState: ProductReducerProp = {
  products: [],
};

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
        state.products.sort((a, b) => b.title.localeCompare(a.title));
      } else {
        state.products.sort((a, b) => a.title.localeCompare(b.title));
      }
    },
    sortByCategory: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.products.sort((a, b) =>
          a.category.name.localeCompare(b.category.name)
        );
      } else {
        state.products.sort((a, b) =>
          b.category.name.localeCompare(a.category.name)
        );
      }
    },
    sortByPrice: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products.sort((a, b) => b.price - a.price);
      }
    },
  },
  extraReducers: (build) => {
    /* FETCH ALL PRODUCTS */
    build.addCase(fetchAllProducts.fulfilled, (state, action) => {
      if (action.payload && "message" in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      } else {
        return { ...state, products: action.payload };
      }
    });
    build.addCase(fetchAllProducts.rejected, (state, action) => {
      toast.error("Error fetching products");
      return state;
    });
    build.addCase(fetchAllProducts.pending, (state, action) => {
      return state;
    });
    /* CREATE PRODUCT */
    build.addCase(createProduct.fulfilled, (state, action) => {
      if (action.payload) {
        state.products.push(action.payload);
        toast.success("Product created successfully");
      } else {
        return state;
      }
    });
    build.addCase(createProduct.pending, (state, action) => {
      return state;
    });
    build.addCase(createProduct.rejected, (state, action) => {
      toast.error("Error creating product");
      return state;
    });
    /* FETCH SINGLE PRODUCT */
    build.addCase(fetchSingleProduct.rejected, (state, action) => {
      toast.error("Error fetching product");
      return state;
    });
    build.addCase(fetchSingleProduct.pending, (state, action) => {
      return state;
    });
    build.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      if (action.payload) {
        return { ...state, products: action.payload };
      } else {
        return state;
      }
    });
    /* DELETE SINGLE PRODUCT */
    build.addCase(deleteSingleProduct.rejected, (state, action) => {
      toast.error("Error deleting product");
      return state;
    });
    build.addCase(deleteSingleProduct.pending, (state, action) => {
      return state;
    });
    build.addCase(deleteSingleProduct.fulfilled, (state, action) => {
      toast.success("Product deleted successfully");
      return state;
    });
    // UPDATE PRODUCT
    build.addCase(updateProduct.rejected, (state, action) => {
      toast.error("Error updating product");
      return state;
    });
    build.addCase(updateProduct.pending, (state, action) => {
      return state;
    });
    build.addCase(updateProduct.fulfilled, (state, action) => {
      return state;
    });
  },
});

const productReducer = productSlice.reducer;
export const { sortByName, sortByCategory, sortByPrice } = productSlice.actions;
export default productReducer;
