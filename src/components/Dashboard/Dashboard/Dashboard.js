import React, { useContext, useEffect } from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { userContext } from '../../../App';
import Book from '../../Book/Book/Book';
import AddAdmin from '../AddAdmin/AddAdmin';
import AddService from '../AddService/AddService';
import BookingList from '../BookingList/BookingList';
import Feedback from '../Feedback/Feedback';
import ManageServices from '../ManageServices/ManageServices';
import Profile from '../Profile/Profile';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';

const Dashboard = ({isAdmin}) => {

    const { path, url } = useRouteMatch();

    const {pathname} = useLocation();

    const [loggedInUser] = useContext(userContext);

    const { photo } = loggedInUser;

    useEffect(() => {
        document.title = 'memory-makers - Dashboard';
    }, [])
    
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-lg-3 col-xl-2">
                    <Sidebar isAdmin={isAdmin} url={url} />
                </div>
                <div className="col-lg-9 col-xl-10">
                    <div className="top-bar d-flex align-items-center justify-content-between py-2 px-3 mt-3 radius sticky-top bg-white">
                        <h2>
                            {pathname?.split('/')[2]?.split(/(?=[A-Z])/)?.join(' ').toUpperCase()||'PROFILE'}
                        </h2>
                        
                       {
                        <img src={photo || 'https://uxwing.com/wp-content/themes/uxwing/download/12-people-gesture/avatar.png'} className="user-logo" alt="" />
                       }
                    </div>
                    <Switch>
                        <Route exact path={path}>
                            <Profile />
                        </Route>
                        <Route path={`${path}/book/:id`}>
                            <Book />
                        </Route>
                        <Route path={`${path}/book`}>
                            <Book />
                        </Route>
                        <Route path={`${path}/bookingList`}>
                            <BookingList isAdmin={isAdmin}/>
                        </Route>
                        <Route path={`${path}/feedback`}>
                            {!isAdmin && <Feedback />}
                        </Route>
                        <Route path={`${path}/addAdmin`}>
                            {isAdmin && <AddAdmin />}
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