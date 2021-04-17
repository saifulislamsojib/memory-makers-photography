import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../../../App';
import './Navbar.css';

const Navbar = ({active}) => {

    const [loggedInUser] = useContext(userContext);

    const history = useHistory();

    const {name, photo} = loggedInUser;
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <Link to="/" className={`navbar-brand mt-lg-2 ${active?.home && 'text-white'}`}>Memory Makers Photography</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item mt-lg-2 text-center">
                            <Link to="/" className={`nav-link ${active?.home}`} aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item mt-2 ms-lg-4 text-center">
                            <Link to="/services" className={`nav-link ${active?.home && 'text-white'}`}>Services</Link>
                        </li>
                        <li className="nav-item mt-2 ms-lg-4 text-center">
                            <Link to="/dashboard" className={`nav-link ${active?.home && 'text-white'}`}>Dashboard</Link>
                        </li>
                        <li className="nav-item mt-2 ms-lg-4 text-center">
                            <Link to="/contact" className={`nav-link ${active?.home && 'text-white'}`}>Contact Us</Link>
                        </li>
                        <li className="nav-item ms-lg-4 text-center">
                            {name ?
                                photo ? <img onClick={()=> history.push('/dashboard')} src={photo} alt=""/>
                                :<h6 onClick={()=> history.push('/dashboard')} className='text-primary mt-3'>{name}</h6>
                                :<button onClick={()=> history.push('/login')} className={`btn btn-outline-success mt-2 px-4 ${active.contact}`}>Login</button>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;