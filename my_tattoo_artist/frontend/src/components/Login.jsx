import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../styles/Modal-Registration-login.css';

function Login(props) {
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
    fetch('http://127.0.0.1:8000/login_artist/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(Response => Response.json())
      .then(responseRequest => {
        // Traiter la réponse de la requête
        /* IF l'email n'exite pas */

        /* IF le mot de passe n'est pas bon */

        /* ELSE redirigé vers la page de l'artiste */
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
        Connexion
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
      </Modal>
    </>
  );
}

export default Login
