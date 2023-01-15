import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { useAppDispatcher, useAppSelector } from "../../../hooks/reduxHook";
import { ProductProp } from "../../../interfaces/ProductProp";
import {
  fetchAllProducts,
  sortByCategory,
  sortByName,
  sortByPrice,
} from "../../../redux/reducers/productReducer";
import { isUserLoggedIn } from "../../../redux/reducers/userReducer";
import CreateProduct from "./CreateProduct";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const [search, setSearch] = useState("");
  const [sortToggle, setSortToggle] = useState<boolean>(false);

  const products: ProductProp[] = useAppSelector((state) => {
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
        {products.map((product: ProductProp) => (
          <div className="productCard" key={product.id}>
            <ProductCard
              product={product}
              userRole={user.user.role}
            ></ProductCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
