import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userContext } from '../../../App';

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
        /> : <h1 className='color-primary text-center mt-5'>Loading...</h1> }
        </>
    );
};

export default PrivateRoute;