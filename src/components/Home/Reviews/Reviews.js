import React, { useEffect, useRef, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Review from '../Review/Review';

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

const Reviews = () => {

    const [reviews, setReviews] = useState([]);

    const unsubscribe = useRef(false);
    
    useEffect(() => {
      unsubscribe.current = true;
      fetch('https://memory-makers-photography.herokuapp.com/reviews')
      .then(res => res.json())
      .then(data => unsubscribe.current&&setReviews(data));
      return ()=> unsubscribe.current = false;
    }, []);

    return (
        <section id="reviews" className='my-5 pt-5 container'>
            <h1 className='color-primary text-center mb-4'>Our Reviews</h1>
            <Carousel 
              responsive={responsive}
              autoPlay={true}
              autoPlaySpeed={1100}
              keyBoardControl={true}
              infinite={true}
              removeArrowOnDeviceType={["tablet", "mobile"]}
            >
            {
              reviews.map(review => <Review review={review} key={review._id} /> )
            }
            </Carousel>
        </section>
    );
};

export default Reviews;