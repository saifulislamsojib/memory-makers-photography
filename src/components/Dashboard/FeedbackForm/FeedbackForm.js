import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { context } from '../../../App';

const FeedbackForm = ({feedbackData, setFeedbackData, setIsOpen}) => {

    const { loggedInUser } = useContext(context);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [ratings, setRatings] = useState(feedbackData?.ratings||0);

    const [hoverRatings, setHoverRatings] = useState(0);

    const onSubmit = data => {
        if (ratings) {
            const {email, photo} = loggedInUser;
            const method = feedbackData?'PATCH':'POST';
            const path = feedbackData?`updateFeedback/${feedbackData._id}`: 'sendFeedback';
            const allData = feedbackData?{...data, ratings}:{...data, email, photo, ratings, feedbackDate: new Date().toDateString()};

            toast.promise(
                fetch(`https://memory-makers-photography.herokuapp.com/${path}`, {
                    method,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(allData)
                })
                .then(res => res.json())
                .then(result=> {
                    if (result){
                        if (feedbackData) {
                            setFeedbackData(preData => ({...preData, ...data, ratings}));
                            swal('Feedback Updated Successfully!','Your feedback updated successfully done!', "success");
                            setIsOpen(false);
                        }
                        else {
                            swal('Feedback Submitted Successfully!','Your feedback submitted successfully done!', "success");
                        }
                    }
                    else {
                        swal('Feedback Not Submitted!','Your feedback not submitted successfully!', "error");
                    }
                }),
                {
                    loading: 'Loading...',
                    success: <b>Submitted Successfully!</b>,
                    error: <b>Could not submitted.</b>,
                }
            )
        }
        else{
            swal('rating Please...!', {icon: 'warning'});
        };
    };

    return (
        <form style={{maxWidth: '650px'}} className="row g-3 mt-3" onSubmit={handleSubmit(onSubmit)} >
            <div className="col-12">
                <input defaultValue={loggedInUser.name} type="text" className="form-control" placeholder="Name" {...register("name", { required: true })} />
                {errors.name && <span className="text-danger d-inline-block mt-2">Name is required</span>}
            </div>
            <div className="col-12">
                <input defaultValue={feedbackData?.company} type="text" className="form-control" placeholder="Company Name" {...register("company", { required: true })} />
                {errors.company && <span className="text-danger d-inline-block mt-2">Company Name is required</span>}
            </div>
            <div className="col-12">
                <textarea defaultValue={feedbackData?.description} style={{height: '200px'}} className="form-control"  placeholder="description" {...register("description", { required: true, minLength: 10 })} />
                {errors.description && <span className="text-danger d-inline-block mt-2">description is required minimum 10 character</span>}
            </div>
            <div className='ratings'>
                <label className="me-3">Ratings</label>
                {
                    ['rating1', 'rating2', 'rating3', 'rating4', 'rating5'].map((rating, i) => <FontAwesomeIcon key={rating}  className={`${rating} ${i<hoverRatings&&'selected-rating'} ${i<ratings&&hoverRatings===0&&'selected-rating'}`} icon={faStar} onClick={()=>setRatings(i+1)} onMouseEnter={()=> setHoverRatings(i+1)} onMouseLeave={()=> setHoverRatings(0)} />)
                }
            </div>
            <div className="col">
                <input className='d-block btn btn-outline-danger ms-auto' type="submit" value="send"/>
            </div>
        </form>
    );
};

export default FeedbackForm;