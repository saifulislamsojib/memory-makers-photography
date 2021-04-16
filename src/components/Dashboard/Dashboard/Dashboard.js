import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import BookingList from '../BookingList/BookingList';
import Feedback from '../Feedback/Feedback';
import Sidebar from '../Sidebar/Sidebar';

const Dashboard = () => {

    let { path, url } = useRouteMatch();

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-lg-3 col-xl-2">
                    <Sidebar url={url} />
                </div>
                <div className="col-lg-9 col-xl-10">
                    <Switch>
                        <Route exact path={path}>
                            <BookingList />
                        </Route>
                        <Route path={`${path}/bookingList`}>
                            <BookingList />
                        </Route>
                        <Route path={`${path}/feedback`}>
                            <Feedback />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;