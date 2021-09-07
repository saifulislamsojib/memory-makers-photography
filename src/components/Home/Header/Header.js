import { faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import image from '../../../images/bg.png';
import BgImage from './BgImage';
import './Header.css';


const Header = () => {
    return (
        <header className="header-container position-relative">
            <div className="position-absolute bg-image">
                <BgImage />
            </div>
            <div className="row mx-auto flex-column-reverse flex-md-row header-row">
                <div className="col-md-4">
                    <div data-aos-offset="300" className="ms-md-5 ps-2 ps-lg-4">
                        <h1 data-aos="fade-down" className="color-primary">World Class Photography</h1>
                        <p data-aos="fade-right" className='my-3'>Any Kind Of Photography Service Find Here. We Makes Your Memory With Our Photography. Happy Photography 📷 📷</p>
                        <div data-aos="fade-left" className="my-2 header-icon">
                            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/saifulsojib.bd" className="me-1 header-links link-1">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/saiful-sojib/" className="me-1 header-links link-2">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                            <a target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UCoCyQ3EKg-0N_prpv3akw4g" className="me-1 header-links link-3">
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                        </div>
                        <a href="#services">
                            <button data-aos="fade-down" className='btn primary-btn'>Show All Services</button>
                        </a>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="bottom-side">
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