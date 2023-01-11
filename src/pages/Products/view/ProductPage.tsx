import { useParams } from "react-router-dom";
import AllProducts from "../components/AllProducts";
import SingleProduct from "../components/SingleProduct";

const ProductPage = () => {
  let { id } = useParams();

  return (
    <div className="container">
      {id ? <SingleProduct id={id} /> : <AllProducts />}
    </div>
  );
};

export default ProductPage;
