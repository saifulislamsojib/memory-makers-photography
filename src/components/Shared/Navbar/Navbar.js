import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { userContext } from '../../../App';
import './Navbar.css';
import navData from './navData';

const Navbar = () => {

    const [loggedInUser] = useContext(userContext);

    const [navbarToggler, setNavbarToggler] = useState(false);

    const [navbarBg, setNavbarBg] = useState(false);

    const history = useHistory();

    const location = useLocation();

    const handleLink = () => {
        window.scrollTo(0, 0);
        setNavbarToggler(!navbarToggler);
    }

    const handleScroll = () => {
        if (window.scrollY > 30) {
            setNavbarBg(true);
        }
        else {
            setNavbarBg(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    const {name, photo} = loggedInUser;
    return (
        <nav className={`navbar navbar-expand-lg position-fixed w-100 ${navbarBg?'shadow navbar-bg':'navbar-transparent'}`}>
            <div className="container">
                <Link to="/" className="navbar-brand">Memory Makers Photography</Link>
                <div onClick={() => setNavbarToggler(!navbarToggler)} className="navbar-toggler" type="button">
                    <div className={navbarToggler ? 'toggler-icon toggler-active' : 'toggler-icon'} />
                </div>
                <div className="navbar-collapse position-relative">
                    <ul className={`navbar-nav ms-auto text-center d-flex align-items-center ${navbarToggler && 'mobile'}`}>
                        {
                            navData.map(({name, path}) => (
                                <li key={path} className="nav-item mt-2 mt-lg-0 text-center me-lg-3">
                                    {
                                        path.startsWith('/')
                                        ?<NavLink exact={true} activeClassName={location.hash?'':'active'} to={path} className="nav-link" onClick={handleLink}>{name}</NavLink>
                                        : <a href={path} className={location.hash===path?'nav-link active':'nav-link'} onClick={()=> setNavbarToggler(!navbarToggler)}>{name}</a>
                                    }
                                </li>
                            ))
                        }
                        <li className="nav-item ms-lg-3 text-center">
                            {
                                name ?
                                photo ? <img onClick={()=> history.push('/dashboard')} className="mt-2 mt-lg-0 mb-3 mb-lg-0" src={photo} alt=""/>
                                :<h6 onClick={()=> history.push('/dashboard')} className={`text-primary mt-2 ${navbarBg?'mt-lg-1':'mt-lg-0'} mb-3 mb-lg-1`}>{name}</h6>
                                :<button onClick={()=> history.push('/login')} className="btn btn-outline-success mt-2 mt-lg-0 mb-3 mb-lg-0 px-4">Login</button>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;