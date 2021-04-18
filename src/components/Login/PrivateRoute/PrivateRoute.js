import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userContext } from '../../../App';
import Spinner from '../../Shared/Spinner/Spinner';

const PrivateRoute = ({ children, ...rest }) => {

    const [loggedInUser, , loading] = useContext(userContext);

    return (
        <>
        {!loading ?
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.email ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />
                )
            }
        /> : <Spinner /> }
        </>
    );
};

export default PrivateRoute;