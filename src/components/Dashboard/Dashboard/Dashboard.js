import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { context } from '../../../App';
import Book from '../../Book/Book/Book';
import AddService from '../AddService/AddService';
import BookingList from '../BookingList/BookingList';
import Feedback from '../Feedback/Feedback';
import ManageAdmin from '../ManageAdmin/ManageAdmin';
import ManageServices from '../ManageServices/ManageServices';
import Profile from '../Profile/Profile';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';

const Dashboard = ({isAdmin}) => {

    const { path, url } = useRouteMatch();

    const {pathname} = useLocation();

    const { loggedInUser } = useContext(context);

    const history = useHistory();

    const [navbarToggler, setNavbarToggler] = useState(false);

    const [bookings, setBookings] = useState([]);

    const { photo } = loggedInUser;

    useEffect(() => {
        document.title = 'memory-makers - Dashboard';
    }, [])
    
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-lg-3 col-xl-2 position-relative">
                    <Sidebar isAdmin={isAdmin} navbarToggler={navbarToggler} url={url} setNavbarToggler={setNavbarToggler} />
                </div>
                <div className="col-lg-9 col-xl-10">
                    <div className="top-bar d-flex align-items-center justify-content-between py-2 px-3 mt-3 radius sticky-top bg-white">
                    <div onClick={() => setNavbarToggler(!navbarToggler)} className="navbar-toggler d-lg-none" type="button">
                        <div className={navbarToggler ? 'toggler-icon toggler-active' : 'toggler-icon'} />
                    </div>
                        <h3 className='mt-1'>
                            {pathname?.split('/')[2]?.split(/(?=[A-Z])/)?.join(' ').toUpperCase()||'PROFILE'}
                        </h3>
                        
                       {
                        <img onClick={()=> history.push('/dashboard')} src={photo || 'https://uxwing.com/wp-content/themes/uxwing/download/12-people-gesture/avatar.png'} className="user-logo" alt="" />
                       }
                    </div>
                    <Switch>
                        <Route exact path={path}>
                            <Profile />
                        </Route>
                        <Route path={`${path}/book/:id`}>
                            <Book setBookings={setBookings} />
                        </Route>
                        <Route path={`${path}/book`}>
                            <Book setBookings={setBookings} />
                        </Route>
                        <Route path={`${path}/bookingList`}>
                            <BookingList isAdmin={isAdmin} bookings={bookings} setBookings={setBookings} />
                        </Route>
                        <Route path={`${path}/feedback`}>
                            {!isAdmin && <Feedback />}
                        </Route>
                        <Route path={`${path}/manageAdmin`}>
                            {isAdmin && <ManageAdmin />}
                        </Route>
                        <Route path={`${path}/addService`}>
                            {isAdmin && <AddService />}
                        </Route>
                        <Route path={`${path}/manageServices`}>
                            {isAdmin && <ManageServices />}
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;