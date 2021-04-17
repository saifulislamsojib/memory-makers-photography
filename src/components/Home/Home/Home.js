import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import BestPhotography from '../BestPhotography/BestPhotography';
import Contact from '../Contact/Contact';
import Header from '../Header/Header';
import Photographs from '../Photographs/Photographs';
import Reviews from '../Reviews/Reviews';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
            <Header />
            <Photographs />
            <Services />
            <BestPhotography />
            <Reviews />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;