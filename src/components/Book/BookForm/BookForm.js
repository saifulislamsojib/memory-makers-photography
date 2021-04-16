import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../../App';

const BookForm = ({onSubmit}) => {

    const [loggedInUser] = useContext(userContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form style={{maxWidth: '600px'}} className="row mx-auto g-3 mt-3" onSubmit={handleSubmit(onSubmit)} >
            <div className="col-12">
                <input defaultValue={loggedInUser.name} type="text" className="form-control" placeholder="Name" {...register("name", { required: true })} />
                {errors.name && <span className="text-danger d-inline-block mt-2">Name is required</span>}
            </div>
            <div className="col-12">
                <input defaultValue={loggedInUser.email} type="email" className="form-control"  placeholder="Email" {...register("email", { required: true })} />
                {errors.email && <span className="text-danger d-inline-block mt-2">Email is required</span>}
            </div>
            <div className="col-12">
                <input  type="text" className="form-control"  placeholder="Address" {...register("address", { required: true })} />
                {errors.address && <span className="text-danger d-inline-block mt-2">Email is required</span>}
            </div>
            <div className="col">
                <input className='d-block btn btn-outline-danger ms-auto' type="submit" value="Book Continue"/>
            </div>
        </form>
    );
};

export default BookForm;