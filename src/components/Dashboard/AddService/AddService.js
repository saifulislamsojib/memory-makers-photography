import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './AddService.css';

const AddService = ({updates}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [image, setImage] = useState(updates?.image||'');

    const [showImageError, setImageError] = useState(false);

    const [isServiceAdded, setIsServiceAdded] = useState(false);
    const onSubmit = data => {
        setIsServiceAdded(false);
        if (image) {
            const {allFeatures, ...other} = data;
            const features = allFeatures.split(', ');
            const services ={features, image, ...other};
            const path = updates?`updateService/${updates._id}`:'addService';
            fetch(`https://memory-makers-photography.herokuapp.com/${path}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(services)
            })
            .then(res => res.json())
            .then(result => setIsServiceAdded(result));
        }
        else {
            setImageError(true);
        }
    };

    const handleImageUpload = e => {
        setImage('');
        setImageError(false);
        const imageData = new FormData();
        imageData.set('key', process.env.REACT_APP_IMAGE_KEY)
        imageData.append('image', e.target.files[0]);

        fetch('https://api.imgbb.com/1/upload',{
            method: 'POST',
            body: imageData,
        })
        .then(res => res.json())
        .then(result => setImage(result.data.display_url));
    };

    const arrFeatures = updates?.features.join(', ');

    return (
        <div className='container mt-3'>
            <form className='row add-service-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-3 col-md-6'>
                    <label className='mb-2'>Service title</label>
                    <input defaultValue={updates?.title}  type="text" className='form-control' {...register("title", { required: true })} placeholder="Service title" />
                    {errors.title && <span className="text-danger">Title is required</span>}
                </div>
                <div className='mb-3 col-md-6'>
                    <label className='mb-2'>Service features <small className="text-muted">(You should write each feature by a comma and a space)</small></label>
                    <input defaultValue={arrFeatures} type="text" className='form-control' {...register("allFeatures", { required: true })} placeholder="Service Features" />
                    {errors.allFeatures && <span className="text-danger">Features is required</span>}
                </div>
                <div className='mb-3 col-md-6'>
                    <label className='mb-2'>Service price</label>
                    <input defaultValue={updates?.price} type="text" className='form-control' {...register("price", { required: true })} placeholder="Service price" />
                    {errors.price && <span className="text-danger">Price is required</span>}
                </div>
                <div className='mb-3 col-md-6'>
                    <label className='d-block mb-2'>Upload Photo</label>
                    <label className='btn btn-outline-success px-4' htmlFor='imageUpload'><FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Photo</label>
                    {showImageError && <span className="text-danger">Image is required</span>}
                    <input type="file" onChange={handleImageUpload} id="imageUpload" className="d-none" />
                </div>
                <div>
                    <button disabled={image===''}  type="submit" className='d-block btn btn-success mt-3 ms-auto'>Save</button>
                </div>
                {isServiceAdded && <h3 className='text-center text-success my-3'>Service {updates?'Updated':'Added'} Successfully</h3>}
            </form>
        </div>
    );
};

export default AddService;