"use client"
import "../../../app/globals.css"
import Header from "@/app/Layout/header/Header";
import Footer from "@/app/Layout/footer";
import Back from "@/app/Layout/back/Back";
import TrendView from ".";
function TrendViewAll() {
    return (
        <div>
            <Header />
            <TrendView />
            <Back />
            <Footer />
        </div>
    );
}

export default TrendViewAll;