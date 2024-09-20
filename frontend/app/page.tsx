"use client"
import { useEffect } from "react";
import "./globals.css"
import Back from "./Layout/back/Back";
import Banner from "./Layout/banner/Banner";
import Collection from "./Layout/collections/Collection";
import Footer from "./Layout/footer";
import Header from "./Layout/header/Header";
import NewProducts from "./Layout/newproducts";
import Trend from "./Layout/trend/Trend";
import Cookies from "js-cookie"
import { io } from "socket.io-client";
import axios from "axios";
export default function Home() {
  useEffect(() => {
    if (Cookies.get("token")) {
      var socket = io("http://localhost:4000/", {
        auth: {
          token: Cookies.get("token")
        }
      })
      return () => {
        socket.disconnect();
      };
    }
  }, [])
  return (
    <div>
      <Header />
      <Back />
      <Banner />
      <NewProducts />
      <Trend />
      <hr style={{
        height: "2px",
        margin: "20px 105px",
        borderTop: "1px solid #eee",
      }}></hr>
      <Collection />
      <Footer />
    </div>
  );
}
