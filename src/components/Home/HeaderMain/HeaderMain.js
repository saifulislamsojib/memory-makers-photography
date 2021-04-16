import React from 'react';
import headerImg from '../../../images/photography-lenses.jpg';

const HeaderMain = () => {

    return (
        <main style={{minHeight: '600px'}} className='row d-flex align-items-center container mx-auto'>
            <div className="col-md-6 text-white">
                <h1>World Class Photography</h1>
                <p className='my-3'>Any Kind Of Photography Service Find Here. We Makes Your Memory With Our Photography. Happy Photography 📷 📷</p>
                <a href="#services">
                    <button className='btn btn-info'>Show All Services</button>
                </a>
            </div>
            <div className="col-md-6 text-center">
                <img className='radius w-75' src={headerImg} alt=""/>
            </div>
        </main>
    );
};

export default HeaderMain;