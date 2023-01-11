import { Button, Input, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useAppDispatcher, useAppSelector } from "../../../hooks/reduxHook";
import { Product } from "../../../interfaces/product";
import {
  fetchAllProducts,
  sortByCategory,
  sortByName,
  sortByPrice,
} from "../../../redux/reducers/productReducer";
import { isUserLoggedIn } from "../../../redux/reducers/userReducer";
import ActionAreaCard from "./ActionAreaCard";
import CreateProduct from "./CreateProduct";

const AllProducts = () => {
  const [search, setSearch] = useState("");
  const [sortToggle, setSortToggle] = useState<boolean>(false);

  const products: Product[] = useAppSelector((state) => {
    return state.productReducer.filter((item) => {
      return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  });

  const user = useAppSelector((state) => {
    return state.userReducer;
  });

  const dispatch = useAppDispatcher();

  const toggleSort = (type: string) => {
    if (type === "name") {
      dispatch(sortByName(sortToggle));
    } else if (type === "category") {
      dispatch(sortByCategory(sortToggle));
    } else if (type === "price") {
      dispatch(sortByPrice(sortToggle));
    }

    setSortToggle(!sortToggle);
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(isUserLoggedIn(user.tokens.access_token));
  }, [dispatch, user.tokens.access_token]);

  useEffect(() => {}, [search]);

  return (
    <div>
      <div className="allProducts-searchAndSortContainer  margin-bottom">
        <TextField
          variant="outlined"
          type="text"
          name="search"
          placeholder="Search product"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          className="margin-left"
          variant="contained"
          onClick={() => toggleSort("name")}
        >
          Sort by name
        </Button>
        <Button
          className="margin-left"
          variant="contained"
          onClick={() => toggleSort("category")}
        >
          Sort by category
        </Button>
        <Button
          className="margin-left"
          variant="contained"
          onClick={() => toggleSort("price")}
        >
          Sort by price
        </Button>
        <CreateProduct></CreateProduct>
      </div>
      <div className="allProducts-container">
        {products.map((product: Product) => (
          <div className="productCard" key={product.id}>
            <ActionAreaCard
              product={product}
              userRole={user.user.role}
            ></ActionAreaCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
