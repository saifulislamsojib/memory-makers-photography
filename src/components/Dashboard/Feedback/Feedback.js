import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../../App';
import './Feedback.css';

const Feedback = () => {

    const [loggedInUser] = useContext(userContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const {email, photo} = loggedInUser;
        fetch('http://localhost:4000/sendFeedback', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data, email, photo})
        })
        .then(res => res.json())
        .then(result=> {
            console.log(result)
        })
    };

    return (
        <section className='mt-4'>
            <h1 className='color-primary'>Feedback</h1>
            <div className='feedback'>
                <form style={{maxWidth: '650px'}} className="row g-3 mt-3" onSubmit={handleSubmit(onSubmit)} >
                    <div className="col-12">
                        <input defaultValue={loggedInUser.name} type="text" className="form-control" placeholder="Name" {...register("name", { required: true })} />
                        {errors.name && <span className="text-danger d-inline-block mt-2">Name is required</span>}
                    </div>
                    <div className="col-12">
                        <input type="text" className="form-control" placeholder="Company Name" {...register("company", { required: true })} />
                        {errors.company && <span className="text-danger d-inline-block mt-2">Company Name is required</span>}
                    </div>
                    <div className="col-12">
                        <textarea style={{height: '200px'}} className="form-control"  placeholder="description" {...register("description", { required: true, minLength: 50 })} />
                        {errors.description && <span className="text-danger d-inline-block mt-2">description is required minimum Length 50</span>}
                    </div>
                    <div className="col">
                        <input className='d-block btn btn-outline-danger ms-auto' type="submit" value="send"/>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Feedback;