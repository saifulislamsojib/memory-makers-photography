import React from 'react';

const Spinner = () => {
    return (
        <div>
            <h3 className='color-primary text-center mt-5'>Loading...</h3>
            <div className="d-flex justify-content-center mt-3">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Spinner;