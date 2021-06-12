import React, { useContext, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { userContext } from '../../../App';
import './Navbar.css';
import navData from './navData';

const Navbar = () => {

    const [loggedInUser] = useContext(userContext);

    const [navbarToggler, setNavbarToggler] = useState(false);

    const history = useHistory();

    const {name, photo} = loggedInUser;
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <Link to="/" className="navbar-brand">Memory Makers Photography</Link>
                <div onClick={() => setNavbarToggler(!navbarToggler)} className="navbar-toggler" type="button">
                    <div className={navbarToggler ? 'toggler-icon toggler-active' : 'toggler-icon'} />
                </div>
                <div className="navbar-collapse position-relative">
                    <ul className={`navbar-nav ms-auto text-center ${navbarToggler && 'mobile'}`}>
                        {
                            navData.map(({name, path}) => (
                                <li key={path} className="nav-item mt-2 mt-lg-0 text-center me-lg-3">
                                    {
                                        path.startsWith('/')
                                        ?<NavLink exact={true} activeClassName='active' to={path} className="nav-link">{name}</NavLink>
                                        : <a href={path} className="nav-link">{name}</a>
                                    }
                                </li>
                            ))
                        }
                        <li className="nav-item ms-lg-4 text-center">
                            {
                                name ?
                                photo ? <img onClick={()=> history.push('/dashboard')} src={photo} alt=""/>
                                :<h6 onClick={()=> history.push('/dashboard')} className="text-primary mt-3">{name}</h6>
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