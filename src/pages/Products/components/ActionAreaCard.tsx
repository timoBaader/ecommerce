import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { IActionAreaCard } from "../../../interfaces/IActionAreaCard";

const ActionAreaCard = ({ product, userRole }: IActionAreaCard) => {
  const navigate = useNavigate();

  const handleRedirect = (id: number) => {
    navigate("/products/" + id);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={product.images[0]} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography
            sx={{ height: 65 }}
            variant="body2"
            color="text.secondary"
          >
            {product.description}
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

export default ActionAreaCard;
