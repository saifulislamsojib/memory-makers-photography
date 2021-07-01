import Carousel from "react-multi-carousel";

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
      breakpoint: { max: 700, min: 0 },
      items: 1
    }
};

const images = [
    'https://showme.co.za/pretoria/files/2016/03/wildlife-photography.jpg',
    'https://pbs.twimg.com/media/CrfD4eaUMAADgMl.jpg',
    'https://assets.website-files.com/5d241d27aab4a552a5dd89b2/5dc213291b705b338c1ae1f9_Lake-Tekapo-Morning-light-XL.jpg',
    'https://assets.website-files.com/5d36cc33dbdba433e24e83ae/5dc1f4f056c5ec672341d67e_Cape-Reinga-beach-Northland.jpg',
    'https://cdn.shopify.com/s/files/1/3026/6974/files/low-light_photography_girl_holding_a_lantern_in_the_grass_at_sunset.jpg?v=1533843508',
    'https://www.khandiephotography.com/wp-content/uploads/2018/02/Bokeh-Babe-4-2.jpg'
]

const BestPhotography = () => {
    return (
        <section className='container mb-3 mt-5'>
            <h1 className='mb-4 color-primary text-center'>Our Best Photography</h1>
            <div data-aos="fade-up" data-aos-easing="ease-in-sine">
              <Carousel 
                  responsive={responsive}
                  autoPlay={true}
                  autoPlaySpeed={1500}
                  keyBoardControl={true}
                  infinite={true}
                  removeArrowOnDeviceType={["tablet", "mobile"]}
              >
                  {
                    images.map(image => <img key={image} className='img-fluid p-2' src={image} alt=""/>)
                  }
              </Carousel>
            </div>
        </section>
    );
};

export default BestPhotography;