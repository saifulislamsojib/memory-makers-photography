import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      border                : 'none',
      boxShadow             : '5px 5px 20px lightgray',
      borderRadius          : '10px'
    }
};

Modal.setAppElement('#root');

const ReactModal = ({children, modalIsOpen, setIsOpen}) => {

  function closeModal(){
    setIsOpen(false);
  }

    return (
        <div>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            >
            <button onClick={closeModal} className="btn d-block ms-auto btn-danger px-3">
                <FontAwesomeIcon className='fs-4 mt-1' icon={faTimes} />
            </button>
            {children}
            </Modal>
        </div>
    );
};

export default ReactModal;