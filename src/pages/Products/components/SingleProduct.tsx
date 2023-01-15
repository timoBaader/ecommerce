import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatcher, useAppSelector } from "../../../hooks/reduxHook";
import { CategoryProp } from "../../../interfaces/CategoryProp";
import { CreateProductProp } from "../../../interfaces/CreateProductProp";
import { ParamsProp } from "../../../interfaces/ParamsProp";
import { ProductProp } from "../../../interfaces/ProductProp";
import { UpdateProductProp } from "../../../interfaces/UpdateProductProp";
import { addItem } from "../../../redux/reducers/cartReducer";
import {
  deleteSingleProduct,
  fetchSingleProduct,
  updateProduct,
} from "../../../redux/reducers/productReducer";
import { isUserLoggedIn } from "../../../redux/reducers/userReducer";

const SingleProduct: React.FC<ParamsProp> = ({ id }) => {
  const product: ProductProp = useAppSelector((state) => {
    return state.productReducer[0];
  });

  const user = useAppSelector((state) => {
    return state.userReducer;
  });

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryProp[]>([]);
  const [updatedProduct, setUpdatedProduct] = useState<CreateProductProp>({
    title: product.title,
    description: product.description,
    price: product.price,
    categoryId: product.category.id,
    images: [""],
  });

  const dispatch = useAppDispatcher();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<number>
  ) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const submitUpdatedProduct = () => {
    let dataToUpdate: UpdateProductProp = {
      id: product.id,
    };
    // Checking which values exist and only adding those
    Object.entries(updatedProduct).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
      if (value) {
        if (key === "images") {
          if (updatedProduct.images[0] !== "") {
            dataToUpdate = { ...dataToUpdate, [key]: value };
          }
        } else {
          dataToUpdate = { ...dataToUpdate, [key]: value };
        }
      }
    });
    console.log(dataToUpdate);
    dispatch(updateProduct(dataToUpdate));
    navigate("/products");
  };

  const fetchCategories = async () => {
    const result = await axios.get(process.env.REACT_APP_URL + "categories");
    return result.data;
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      // const imageUrl = [URL.createObjectURL(e.target.files[0])];
      // using lorem picsum because the user cant upload to the server
      setUpdatedProduct({
        ...updatedProduct,
        images: ["https://picsum.photos/200"],
      });
    }
  };

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
    });
    dispatch(isUserLoggedIn(user.tokens.access_token));
    dispatch(fetchSingleProduct(parseInt(id)));
  }, [dispatch, id, user.tokens.access_token]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="container">
      <Card sx={{ display: "flex", width: "fit-content", margin: "auto" }}>
        <Box sx={{ width: "30em" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "90%",
              justifyContent: "space-between",
            }}
          >
            <Typography component="div" variant="h5">
              {product.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" component="div">
              {product.description}
            </Typography>
            <Typography
              sx={{ alignSelf: "flex-end" }}
              variant="h6"
              color="text.secondary"
              component="div"
            >
              {product.price}€
            </Typography>
            <div>
              {user.user && user.user.role === "admin" && (
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(deleteSingleProduct(product.id));
                    navigate(-1);
                  }}
                >
                  Delete
                </Button>
              )}
              {user.user && user.user.role === "admin" && (
                <Button
                  className="margin-left"
                  variant="contained"
                  onClick={handleOpen}
                >
                  Edit
                </Button>
              )}
              <Button
                className="margin-left"
                variant="contained"
                onClick={() => dispatch(addItem(product))}
              >
                Add to cart
              </Button>
            </div>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 500 }}
          image={product.images[0]}
          alt="Image of the product"
        />
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} noValidate autoComplete="off">
          <div>
            <TextField
              required
              name="title"
              id="title"
              value={updatedProduct.title}
              label="Title"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              name="description"
              id="description"
              value={updatedProduct.description}
              label="Description"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              name="price"
              type="number"
              id="price"
              value={updatedProduct.price}
              label="Price"
              onChange={(e) => handleChange(e)}
            />
            <InputLabel id="categoryId-label">Category</InputLabel>
            <Select
              labelId="categoryId-label"
              id="categoryId"
              name="categoryId"
              value={updatedProduct.categoryId}
              label="Category"
              onChange={(e) => handleChange(e)}
            >
              {categories.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
            <Input
              type="file"
              name="images"
              // @ts-ignore
              onChange={(e) => handleImage(e)}
            ></Input>
            <Button onClick={() => submitUpdatedProduct()}>
              Create Product
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SingleProduct;
