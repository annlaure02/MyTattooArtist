import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../../styles/header/Registration-Login.css';
import { LoginArtist } from './LoginArtist';

function Login() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const redirectArtistPage = useNavigate();

  const { loginProfile } = LoginArtist();

  const onSubmit = (data) => {
    loginProfile(data, redirectArtistPage);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Connexion
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="custom-modal"
        id='modal'
      >
        <div className='custom-modal-inside'>
          <Modal.Header closeButton>
            <div className='modal-title'>
              <Modal.Title>
                <h2>Connexion</h2>
              </Modal.Title>
            </div>
          </Modal.Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
              <div className='form-container'>
                <div>
                  <FloatingLabel controlId="email" label="Adresse mail*" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" {...register('email', { required: true })} />
                  </FloatingLabel>
                </div>
                {errors.email && <p className="error-message">Le champ Adresse mail est obligatoire.</p>}
                <div className='space-between-label'>
                  <FloatingLabel controlId="password" label="Mot de passe* (8 caractères minimum)" className="mb-3">
                    <Form.Control type="password" placeholder="min 8 caractères" {...register('password', { required: true, minLength: 8 })} />
                  </FloatingLabel>
                </div>
              </div>
            </Modal.Body>
            <div>
              <Modal.Footer>
                <div className='modal-button'>
                  <Button variant="primary" className='custom-button-connexion' type='submit'>
                    Connexion</Button>
                  <Button variant="secondary" onClick={handleClose} className='custom-button-close'>
                    Fermer</Button>
                </div>
              </Modal.Footer>
            </div>
          </form>
        </div>

      </Modal>
    </>
  );
}

export default Login