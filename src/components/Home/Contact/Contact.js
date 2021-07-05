import emailjs from 'emailjs-com';
import React, { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { context } from '../../../App';
import './Contact.css';

const Contact = () => {

    const { loggedInUser } = useContext(context);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const fromRef = useRef();

    const onSubmit = () => {
        emailjs.sendForm('service_f5x3bt4', 'template_t44ybek', fromRef.current, 'user_tgsfRKXHSudANgSVs0uRe')
        .then(() => {
            swal("Message sended!", "Your message successfully sended!", "success");
            fromRef.current.reset();
        }, () => {
            swal("Message Not sended!", "Your message not sended. Try again Latter!", "error");
            fromRef.current.reset();
        });
    };

    return (
        <section id="contacts">
            <div className='contact-inner py-5'>
                <div className="container">
                    <h1 className='text-center mb-3'>Contact Us</h1>
                    <div className="row pt-3 d-flex align-items-center">
                        <div data-aos="flip-down" className="col-lg-6">
                            <form className="row g-3 mt-3" onSubmit={handleSubmit(onSubmit)} ref={fromRef} >
                                <div className="col-md-6">
                                    <label className='mb-2 ms-2' htmlFor="">Name</label>
                                    <input defaultValue={loggedInUser.name} type="text" className="form-control radius" placeholder="Name" {...register("name", { required: true })} name="name" />
                                    {errors.name && <span className="alert-danger p-1 rounded d-inline-block mt-2">Name is required</span>}
                                </div>
                                <div className="col-md-6">
                                    <label className='mb-2 ms-2' htmlFor="">Email</label>
                                    <input defaultValue={loggedInUser.email} type="email" className="form-control radius" placeholder="Email" {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} name="email" />
                                    {errors.email && <span className="alert-danger p-1 rounded d-inline-block mt-2">Valid Email is required</span>}
                                </div>
                                <div className="col-md-6">
                                    <label className='mb-2 ms-2' htmlFor="">Phone</label>
                                    <input type="text" className="form-control radius" placeholder="Phone Number" {...register("phone", { required: true })} name="phone" />
                                    {errors.phone && <span className="alert-danger p-1 rounded d-inline-block mt-2">Phone Number is required</span>}
                                </div>
                                <div className="col-md-6">
                                    <label className='mb-2 ms-2' htmlFor="">Address <span className="muted-text">(Optional)</span></label>
                                    <input type="text" className="form-control radius" placeholder="Address" {...register("address")} name="address" />
                                </div>
                                <div className="col-12">
                                    <label className='mb-2 ms-2' htmlFor="">Write Message</label>
                                    <textarea style={{height: '200px'}} className="form-control radius"  placeholder="Write Message" {...register("message", { required: true, minLength: 10 })} name="message" />
                                    {errors.message && <span className="alert-danger p-1 rounded d-inline-block mt-2">Message is required minimum 10 character</span>}
                                </div>
                                <div>
                                    <input className='d-block btn btn-primary ms-auto' type="submit" value="send"/>
                                </div>
                            </form>
                        </div>
                        <div data-aos="flip-up" className="col-lg-6 mt-3 mt-md-0">
                            <iframe
                                title='google map'
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1435090089553!2d90.42196781429821!3d23.813495392281492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c62fb95f16c1%3A0xb333248370356dee!2sJamuna%20Future%20Park!5e0!3m2!1sen!2sbd!4v1622272644774!5m2!1sen!2sbd'
                                width='100%'
                                height='450px'
                                style={{ border: "0", borderRadius: '10px' }}
                                loading='lazy'
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;