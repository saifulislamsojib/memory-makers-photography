import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Review = ({review, feedback, children}) => {
    const {name, description, photo, ratings, company} = review;

    const avatar = 'https://uxwing.com/wp-content/themes/uxwing/download/12-people-gesture/avatar.png';

    return (
        <div className={feedback?'d-flex justify-content-center':''}>
            <div style={feedback?{maxWidth: '400px'}:{}} className={`mb-3 text-center p-3 ${feedback?'':'mx-2'} radius shadow my-3`}>
                <img style={{height: '100px', width: '100px'}} className='img-fluid rounded-pill' src={photo || avatar} alt=""/>
                <h4 className='my-3'>{name}</h4>
                <h6>{company}</h6>
                <p className='mt-3'>{description}</p>
                <div>
                    {
                        ['rating1', 'rating2', 'rating3', 'rating4', 'rating5'].map((rating, i) => <FontAwesomeIcon key={rating}  className={`${i<ratings&&'selected-rating'}`} icon={faStar} />)
                    }
                </div>
                {children}
            </div>
        </div>
    );
};

export default Review;