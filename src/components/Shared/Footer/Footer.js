import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <section style={{backgroundImage: 'linear-gradient(to right, #4112ff, #2478ff)'}} className="bgc-primary text-white pt-5 pb-2 mt-5">
            <div className="container">
            <div className="row g-4">
                <div className="col-md-3 col-sm-6">
                    <h4>About Us</h4>
                    <p className="text-white mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos et numquam odit quaerat officia quasi ab esse</p>
                </div>
                <div className="col-md-3 col-sm-6">
                    <h4>Company</h4>
                    <div className="list-group mt-3">
                        <a className="text-white link" href="#privacy-policy">Privacy Policy</a>
                        <a className="text-white link mt-2" href="#term&Conditions">Term & Conditions</a>
                        <a className="text-white link mt-2" href="#latestBlog">Latest Blog</a>
                    </div>
                </div>
                <div className="col-md-3 mt-3 mt-md-0 col-sm-6">
                    <h4>Quick Links</h4>
                    <div className="list-group mt-3">
                        <Link to='/' className="text-white link">Home</Link>
                        <Link to='/dashboard' className="text-white mt-2 link" >Dashboard</Link>
                        <a className="text-white mt-2 link" href="#services">services</a>
                        <a className="text-white mt-2 link" href="#contacts">Contact</a>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mt-3  mt-md-0">
                    <h4>Social Page</h4>
                    <div className="list-group mt-3">
                        <a rel="noreferrer" target="_blank" className="text-white link" href="https://www.facebook.com/saifulsojib.bd/"><FontAwesomeIcon icon={faFacebook} className="me-2" /> Facebook</a>
                        <a rel="noreferrer" target="_blank" className="text-white link mt-2" href="https://www.linkedin.com/in/saiful-sojib/"><FontAwesomeIcon icon={faLinkedin} className="me-2" /> Linkedin</a>
                        <a rel="noreferrer" target="_blank" className="text-white link mt-2" href="https://www.instagram.com/saifulislam.sojib/"><FontAwesomeIcon icon={faInstagram} className="me-2" /> Instagram</a>
                        <a rel="noreferrer" target="_blank" className="text-white link mt-2" href="https://www.youtube.com/channel/UCnyYa1ZmY2XvKsBHnwE2n4w"><FontAwesomeIcon icon={faYoutube} className="me-2" /> YouTube</a>
                    </div>
                </div>
            </div>
            </div>
            <footer className="container">
                <hr/>
                <p className='text-white text-center mt-3'> &copy; {new Date().getFullYear()}, All Rights Reserved By Memory Makers Photography</p>
            </footer>
        </section>
    );
};

export default Footer;