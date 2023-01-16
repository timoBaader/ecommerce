import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks/reduxHook";
import "react-toastify/dist/ReactToastify.css";

import CartPage from "./pages/cart/CartPage";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import ProductPage from "./pages/Products/view/ProductPage";
import ProfilePage from "./pages/profile/view/ProfilePage";
import "../src/css/styles.css";
import { ToastContainer } from "react-toastify";

function App() {
  const userState = useAppSelector((state) => {
    return state.userReducer;
  });

  return (
    <BrowserRouter>
      <div className="navBar">
        <Link className="margin-left" to="/">
          Home
        </Link>
        <Link className="margin-left" to="/products">
          Products
        </Link>
        <Link className="margin-left" to="/cart">
          Cart
        </Link>
        {userState.tokens.access_token ? (
          <Link className="margin-left" to="/profile">
            Profile
          </Link>
        ) : (
          <Link className="margin-left" to="/profile">
            Login
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductPage />}>
          <Route path=":id" element={<ProductPage />}></Route>
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer position="bottom-left" />
    </BrowserRouter>
  );
}

export default App;
