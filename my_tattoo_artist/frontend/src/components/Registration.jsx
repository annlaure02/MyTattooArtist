import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../styles/Registration.css';

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
  const onSubmit = (data) => {
    fetch('http://127.0.0.1:8000/page_artist/', {
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
        redirectArtistPage('/ma-page-artiste');
      })
      .catch(error => {
        // Gérer les erreurs de la requête
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
      >
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
                <FloatingLabel controlId="name" label="Nom*" className="mb-3">
                  <Form.Control type="text" placeholder="" {...register('name', { required: true })} />
                </FloatingLabel>
              </div>
              {errors.name && <p className="error-message">Le champ Nom est obligatoire.</p>}
              <div className='space-between-label'>
                <FloatingLabel controlId="firstName" label="Prénom*" className="mb-3">
                  <Form.Control type="text" placeholder="" {...register('firstName', { required: true })} />
                </FloatingLabel>
              </div>
              {errors.firstName && <p className="error-message">Le champ Prénom est obligatoire.</p>}
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
      </Modal>
    </>
  );
}

export default Registration
