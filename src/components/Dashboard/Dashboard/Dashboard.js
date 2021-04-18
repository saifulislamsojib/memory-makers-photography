import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddAdmin from '../AddAdmin/AddAdmin';
import AddService from '../AddService/AddService';
import BookingList from '../BookingList/BookingList';
import Feedback from '../Feedback/Feedback';
import ManageServices from '../ManageServices/ManageServices';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';

const Dashboard = ({isAdmin}) => {

    let { path, url } = useRouteMatch();
    
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-lg-3 col-xl-2">
                    <Sidebar isAdmin={isAdmin} url={url} />
                </div>
                <div className="col-lg-9 col-xl-10">
                    <Switch>
                        <Route exact path={path}>
                            <BookingList isAdmin={isAdmin} />
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