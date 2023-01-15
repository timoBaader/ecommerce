import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import axios from "axios";
import { useAppDispatcher } from "../../../hooks/reduxHook";
import { createProduct } from "../../../redux/reducers/productReducer";
import { CategoryProp } from "../../../interfaces/CategoryProp";
import { CreateProductProp } from "../../../interfaces/CreateProductProp";

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

const CreateProduct = () => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<CreateProductProp>({
    title: "",
    description: "",
    price: 0,
    categoryId: 1,
    images: [],
  });
  const [categories, setCategories] = useState<CategoryProp[]>([]);
  const dispatch = useAppDispatcher();

  const fetchData = async () => {
    const result = await axios.get(process.env.REACT_APP_URL + "categories");
    return result.data;
  };

  useEffect(() => {
    fetchData().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      // const imageUrl = [URL.createObjectURL(e.target.files[0])];
      // using lorem picsum because the user cant upload to the server
      setProduct({ ...product, images: ["https://picsum.photos/200"] });
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent<number>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitProduct = () => {
    console.log("HERE");
    dispatch(createProduct(product));
  };

  return (
    <div>
      <Button
        variant="contained"
        className="margin-left create-product-btn"
        onClick={handleOpen}
      >
        Create Product
      </Button>
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
              label="Title"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              name="description"
              id="description"
              label="Description"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              name="price"
              type="number"
              id="price"
              label="Price"
              onChange={(e) => handleChange(e)}
            />
            <InputLabel id="categoryId-label">Category</InputLabel>
            <Select
              labelId="categoryId-label"
              id="categoryId"
              name="categoryId"
              value={product.categoryId}
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
            <Button onClick={() => submitProduct()}>Create Product</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateProduct;
