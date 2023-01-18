import React, { useContext, useEffect } from "react";
import { context } from "../../../App";
import useActive from "../../../hooks/useActive";
import Spinner from "../../Shared/Spinner/Spinner";
import Service from "../Service/Service";

const Services = ({ book }) => {
  const { services, setServices } = useContext(context);

  const ref = useActive("services");

  useEffect(() => {
    let unsubscribe = true;
    if (!services.length) {
      fetch("https://memory-makers-photography-server.vercel.app/services")
        .then((res) => res.json())
        .then((data) => unsubscribe && setServices(data))
        .catch((err) => console.log(err));
    }
    return () => (unsubscribe = false);
  }, [setServices, services]);

  return (
    <section
      id="services"
      className={book ? "mt-3 maxWidth mx-auto" : "mt-5 pt-5 container"}
      ref={ref}
    >
      <h1 className="mb-4 text-center color-primary">Our Spacial Services</h1>
      {services.length > 0 ? (
        <div className="row">
          {services.map((service) => (
            <Service service={service} key={service._id} />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default Services;
