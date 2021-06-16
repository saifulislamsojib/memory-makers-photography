import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { context } from '../../../App';
import Review from '../../Home/Review/Review';
import Spinner from '../../Shared/Spinner/Spinner';
import FeedbackForm from '../FeedbackForm/FeedbackForm';
import ReactModal from '../Modal/Modal';

const Feedback = () => {

    const { loggedInUser } = useContext(context);

    const [feedbackData, setFeedbackData] = useState({});

    const [loading, setLoading] = useState(true);

    const [modalIsOpen,setIsOpen] = useState(false);

    useEffect(() => {
        fetch(`https://memory-makers-photography.herokuapp.com/review?email=${loggedInUser.email}`)
        .then(res => res.json())
        .then(data => {
            setFeedbackData(data);
            setLoading(false);
        })
    }, [loggedInUser.email])
    
    return (
        <section className='mt-3'>
            <Toaster />
            <div className='feedback'>
                {
                    loading?<Spinner />
                    :feedbackData.email?
                    <Review review={feedbackData} feedback>
                        <button onClick={() => setIsOpen(true)} className="mt-3 btn btn-primary">Edit <FontAwesomeIcon icon={faEdit} className="ms-2" /></button>
                    </Review>
                    :<FeedbackForm />
                }
                <ReactModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
                    <FeedbackForm feedbackData={feedbackData} setFeedbackData={setFeedbackData} setIsOpen={setIsOpen} />
                </ReactModal>
            </div>
        </section>
    );
};

export default Feedback;