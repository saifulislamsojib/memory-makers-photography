import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = ({dashboard}) => {

    const history = useHistory();

    return (
        <div className='text-danger text-center mt-5'>
            <h1>Not Found</h1>
            <h2>404 Error</h2>
            <button onClick={() => history.push(dashboard?'/dashboard':'/')} className='btn btn-outline-info mt-4'>Go To {dashboard?'Dashboard':'Home'}</button>
        </div>
    );
};

export default NotFound;