import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import useActive from "../../../hooks/useActive";
import Spinner from "../../Shared/Spinner/Spinner";
import Review from "../Review/Review";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 1,
  },
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const ref = useActive("reviews");

  useEffect(() => {
    let unsubscribe = true;
    fetch("https://memory-makers-photography-server.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => unsubscribe && setReviews(data))
      .catch((err) => console.log(err));
    return () => {
      unsubscribe = false;
    };
  }, []);

  return (
    <section ref={ref} id="reviews" className="my-5 pt-5 container">
      <h1 className="color-primary text-center mb-4">Our Reviews</h1>
      {reviews.length > 0 ? (
        <div data-aos="fade-up" data-aos-easing="ease-in-sine">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={1500}
            keyBoardControl={true}
            infinite={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {reviews.map((review) => (
              <Review review={review} key={review._id} />
            ))}
          </Carousel>
        </div>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default Reviews;
