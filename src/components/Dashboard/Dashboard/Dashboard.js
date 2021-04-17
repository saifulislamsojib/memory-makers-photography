import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddAdmin from '../AddAdmin/AddAdmin';
import BookingList from '../BookingList/BookingList';
import Feedback from '../Feedback/Feedback';
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
                            <BookingList />
                        </Route>
                        <Route path={`${path}/bookingList`}>
                            <BookingList />
                        </Route>
                        {!isAdmin &&
                        <Route path={`${path}/feedback`}>
                            <Feedback />
                        </Route>}
                        {isAdmin &&
                        <Route path={`${path}/addAdmin`}>
                            <AddAdmin />
                        </Route>}
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;