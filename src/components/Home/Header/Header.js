import { faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import image from '../../../images/bg.png';
import './Header.css';

const bgImage = <svg className="svg-background" width="315" height="244" viewBox="0 0 315 244" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className="path1" d="M0.105614 0C0.105614 0 -4.29438 57.1 43.7056 66.8C91.7056 76.5 140.206 70.2 132.106 120.9C123.506 174.6 153.706 220.9 196.206 206.4C243.806 190.3 314.806 243.2 314.806 243.2V0H0.105614Z" fill="#F1EEFF"/>
<path className="path2" d="M31.6056 0C31.6056 0 27.2056 57.1 75.2056 66.8C123.206 76.5 181.406 53.8 173.306 104.5C164.706 158.2 188.306 204.2 230.806 189.7C278.306 173.5 314.706 203.3 314.706 203.3L314.806 0H31.6056Z" fill="url(#paint0_linear)"/>
<defs>
<linearGradient id="paint0_linear" x1="31.4862" y1="101.652" x2="314.793" y2="101.652" gradientUnits="userSpaceOnUse">
<stop stopColor="#9671FF"/>
<stop offset="1" stopColor="#7A4FFF"/>
</linearGradient>
</defs>
</svg>

const Header = () => {
    return (
        <header className="header-container position-relative">
            <div className="position-absolute bg-image">
                {bgImage}
            </div>
            <div className="row flex-column-reverse flex-md-row header-row">
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