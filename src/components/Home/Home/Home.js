import React from 'react';
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
            <Reviews />
        </div>
    );
};

export default Home;