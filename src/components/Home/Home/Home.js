import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import ActiveProvider from "../../../context/ActiveContext";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import BestPhotography from "../BestPhotography/BestPhotography";
import Contact from "../Contact/Contact";
import Header from "../Header/Header";
import Photographs from "../Photographs/Photographs";
import Reviews from "../Reviews/Reviews";
import Services from "../Services/Services";

const Home = () => {
  useEffect(() => {
    document.title = "memory-makers - home";
  }, []);

  return (
    <ActiveProvider>
      <div className="home-container">
        <Navbar />
        <Header />
        <Photographs />
        <Services />
        <BestPhotography />
        <Reviews />
        <Contact />
        <Footer />
      </div>
    </ActiveProvider>
  );
};

export default Home;
