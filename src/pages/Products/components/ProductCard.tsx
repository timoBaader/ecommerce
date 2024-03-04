import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ProductCardProp } from "../../../interfaces/product/ProductCardProp";

const ProductCard = ({ product }: ProductCardProp) => {
  const navigate = useNavigate();

  const handleRedirect = (id: number) => {
    navigate("/products/" + id);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={product.category.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography
            sx={{ height: 65 }}
            variant="body2"
            color="text.secondary"
          >
            {(product.description.length > 100) ? 
              `${product.description.substring(0, 100)}...` : 
              product.description
            }
          </Typography>
          <Typography
            sx={{ height: 10 }}
            variant="body2"
            color="text.secondary"
          >
            {product.price}€
          </Typography>
        </CardContent>
        <Button
          className="btn"
          variant="contained"
          onClick={() => handleRedirect(product.id)}
        >
          View
        </Button>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
