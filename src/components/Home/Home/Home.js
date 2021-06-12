import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Navbar from '../../Shared/Navbar/Navbar';
import BestPhotography from '../BestPhotography/BestPhotography';
import Contact from '../Contact/Contact';
import Header from '../Header/Header';
import Photographs from '../Photographs/Photographs';
import Reviews from '../Reviews/Reviews';
import Services from '../Services/Services';

const Home = () => {

    document.title = 'memory-makers - home';

    return (
        <div>
            <Navbar />
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