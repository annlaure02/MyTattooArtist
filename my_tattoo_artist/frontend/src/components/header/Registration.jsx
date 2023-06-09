import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../../styles/header/Registration-Login.css';

function Registration(props) {
  /* variable pour gérer le clic sur le bouton et l'ouverture du modal */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* register: permet d'enregistrer les valeurs que vont prendre les champsdu formulaire */
  /* handleSubmit: permet de transferer les données */
  const { register, handleSubmit, formState: { errors } } = useForm();

  /* rediriger l'utilisateur lorqu'il clique sur valider */
  const redirectArtistPage = useNavigate();

  /* fonction qui fait la requête POST */
  const onSubmit = async (data) => {
    await fetch('http://127.0.0.1:8000/api/ma-page-artiste/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(Response => Response.json())
      .then(responseRequest => {
        // Traiter la réponse de la requête
        console.log(responseRequest);
        const userId = responseRequest.id;
        const redirectUrl = `/ma-page-artiste/${userId}`;
        redirectArtistPage(redirectUrl);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la requête :', error);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Inscription
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
                <h2>Inscription</h2>
              </Modal.Title>
            </div>
          </Modal.Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
              <div className='form-container'>
                <div>
                  <FloatingLabel controlId="last_name" label="Nom*" className="mb-3">
                    <Form.Control type="text" placeholder="" {...register('last_name', { required: true })} />
                  </FloatingLabel>
                </div>
                {errors.last_name && <p className="error-message">Le champ Nom est obligatoire.</p>}
                <div className='space-between-label'>
                  <FloatingLabel controlId="first_name" label="Prénom*" className="mb-3">
                    <Form.Control type="text" placeholder="" {...register('first_name', { required: true })} />
                  </FloatingLabel>
                </div>
                {errors.first_name && <p className="error-message">Le champ Prénom est obligatoire.</p>}
                <div className='space-between-label'>
                  <FloatingLabel controlId="phone" label="Numéro de téléphone*" className="mb-3">
                    <Form.Control type="text" placeholder="" {...register('phone', { required: true })} />
                  </FloatingLabel>
                </div>
                {errors.phone && <p className="error-message">Le champ Numéro de téléphone est obligatoire.</p>}
                <div className='space-between-label'>
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
                {errors.password && <p className="error-message">Le champ Mot de passe est obligatoire et doit contenir au moins 8 caractères.</p>}
              </div>
            </Modal.Body>
            <div>
              <Modal.Footer>
                <div className='modal-button'>
                  <Button variant="primary" className='custom-button-inscription' type='submit'>
                    Inscription</Button>
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

export default Registration
