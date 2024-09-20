"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../app/globals.css";
import banner1 from "../../../public/imagesBanner/banner-web_ba770b5fc0e64dd1a63a2e3ba932e540_118996b53ab7420d9e78c48f18ab0516.webp";
import banner2 from "../../../public/imagesBanner/banner1.webp";
import banner3 from "../../../public/imagesBanner/banner2.webp";
import { SampleNextArrow, SamplePrevArrow } from "./ButtonCustom";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    lazyLoad: true,
    autoplaySpeed: 2000,
    cssEase: "linear",

    customPaging: (i) => (
      <div
        style={{
          width: "27px",
          height: "2px",
          border: "1px white solid",
        }}></div>
    ),
  };
  return (
    <Slider {...settings}>
      <div>
        <Image
          src={banner1}
          alt="Picture of the author"
          placeholder="blur" // Optional blur-up while loading
        />
      </div>
      <div>
        <Image
          src={banner2}
          alt="Picture of the author"
          placeholder="blur" // Optional blur-up while loading
        />
      </div>
      <div>
        <Image
          src={banner3}
          alt="Picture of the author"
          placeholder="blur" // Optional blur-up while loading
        />
      </div>
    </Slider>
  );
}

export default Banner;
