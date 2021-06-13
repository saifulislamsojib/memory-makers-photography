import React from 'react';
import image from '../../../images/bg.png';
import './Header.css';

const Header = () => {
    return (
        <header className="header-container">
            <div className="row d-flex align-items-center flex-column-reverse flex-md-row">
                <div className="col-md-4">
                    <div data-aos-offset="300" className="ms-md-5 ps-3 pe-3 pe-md-0">
                        <h1 data-aos="fade-down" className="color-primary">World Class Photography</h1>
                        <p data-aos="fade-right" className='my-3'>Any Kind Of Photography Service Find Here. We Makes Your Memory With Our Photography. Happy Photography 📷 📷</p>
                        <a href="#services">
                            <button data-aos="fade-up" className='btn btn-info text-white'>Show All Services</button>
                        </a>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="header">
                        <img data-aos="fade-down"
                            className="img-fluid"
                            src={image} alt=""
                         />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;