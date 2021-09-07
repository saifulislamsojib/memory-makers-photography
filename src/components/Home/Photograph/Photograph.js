import React from 'react';

const Photograph = ({photograph}) => {
    const {title, image, aos} = photograph;
    return (
        <div data-aos={aos} className='col-lg-4 col-md-6 mb-2'>
            <img className='img-fluid radius' src={image} alt=""/>
            <h4 className='mt-3 text-center'>{title}</h4>
        </div>
    );
};

export default Photograph;