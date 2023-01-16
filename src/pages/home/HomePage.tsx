import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import { useAppSelector } from "../../hooks/reduxHook";
import { Typography } from "@mui/material";
import ProductCard from "../Products/components/ProductCard";
import { ProductProp } from "../../interfaces/ProductProp";

const HomePage = () => {
  const products: ProductProp[] = useAppSelector((state) => {
    return state.productReducer.products.slice(5, 10);
  });
  const user = useAppSelector((state) => {
    return state.userReducer;
  });

  return (
    <div className="container">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <img
            className="swiper-slide img"
            src={require("../../assets/images/slide1.jpg")}
            alt="slide1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="swiper-slide img"
            src={require("../../assets/images/slide2.jpg")}
            alt="slide1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="swiper-slide img"
            src={require("../../assets/images/slide3.jpg")}
            alt="slide1"
          />
        </SwiperSlide>
      </Swiper>
      <Typography className="centerText" variant="h5">
        Check out people's favorite products!
      </Typography>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {products.map((product: ProductProp, index) => (
          <SwiperSlide key={index} className="productSwiper">
            <div className="productCard" key={product.id}>
              <ProductCard
                product={product}
                userRole={user.user ? user.user.role : ""}
              ></ProductCard>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomePage;
