import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import HeaderMain from '../HeaderMain/HeaderMain';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <Navbar active={{home: 'active'}} />
            <HeaderMain />
        </header>
    );
};

export default Header;