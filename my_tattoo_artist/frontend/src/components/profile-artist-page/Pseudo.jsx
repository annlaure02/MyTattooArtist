import React, { useState } from 'react'
import { GrAdd, GrEdit } from "react-icons/gr";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { LoginArtist } from '../header/LoginArtist';

function Pseudo() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    LoginArtist().updatePost(data);
  };

  return (
    <>
      
      <div>
        <button onClick={handleShow}>
          <GrAdd />
        </button>
        <Modal
          show={show}
          onHide={handleClose}
          id='modal1'
        >
          <div className='custom-modal-inside'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
                <div className='form-container'>
                  <FloatingLabel controlId="last_name" label="Nom d'artiste" className="mb-3">
                    <Form.Control type="text" placeholder="" {...register('last_name', { required: true })} />
                  </FloatingLabel>
                  <Button variant="primary" className='custom-button-inscription' type='submit'>
                    Valider</Button>
                </div>
              </Modal.Body>
            </form>
          </div>
        </Modal>
        <button><GrEdit /></button>
      </div>
    </>
  )
}

export default Pseudo
