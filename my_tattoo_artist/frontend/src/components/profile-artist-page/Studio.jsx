import React, { useContext, useState } from 'react'
import { PencilFill, PlusLg } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { ArtistContext } from '../header/ArtistAuth';
import '../../styles/private-artist-page/Pseudo.css'

function Studio({ dataUpdated }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit } = useForm();

  const { artistId } = useContext(ArtistContext)

  const onSubmit = async (data) => {
    const url = `http://127.0.0.1:8000/api/ma-page-artiste/${artistId}/`
    try {
      if (artistId) {
        const updateResponse = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (updateResponse.ok) {
          const responseData = await updateResponse.json();
          dataUpdated(responseData);
        }
        else {
          console.log('An error is produced during the request PUT');
        }
      }
    }
    catch (error) {
      console.error('An error is produced during the request:', error);
    }
    handleClose();
  };

  return (
    <>
      <div>
        <button className='add-button' onClick={handleShow}>
          <PlusLg className='plus-icon'/> Ajouter
        </button>
        <Modal
          show={show}
          onHide={handleClose}
          id='artist-modal'
        >
          <div className='custom-modal-inside'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
                <div className='form-container'>
                  <FloatingLabel controlId="studio_name" label="Nom du Studio*" className="mb-3">
                    <Form.Control type="text" placeholder="" {...register('studio_name', { required: true })} />
                  </FloatingLabel>
                  <FloatingLabel controlId="studio_number_street" label="Numéro*" className="mb-3">
                    <Form.Control type="text" placeholder="" {...register('studio_number_street', { required: true })} />
                  </FloatingLabel>
                  <FloatingLabel controlId="studio_street" label="Rue*" className="mb-3">
                    <Form.Control type="text" placeholder="" {...register('studio_street', { required: true })} />
                  </FloatingLabel>
                  <FloatingLabel controlId="studio_post_code" label="Code Postal*" className="mb-3">
                    <Form.Control type="text" placeholder="" {...register('studio_post_code', { required: true })} />
                  </FloatingLabel>
                  <FloatingLabel controlId="studio_city" label="Ville*" className="mb-3">
                    <Form.Control type="text" placeholder="" {...register('studio_city', { required: true })} />
                  </FloatingLabel>
                  <FloatingLabel controlId="studio_state" label="Numéro de département*" className="mb-3">
                    <Form.Control type="text" placeholder="" {...register('studio_state', { required: true })} />
                  </FloatingLabel>
                  <FloatingLabel controlId="studio_country" label="Pays*" className="mb-3">
                    <Form.Control type="text" placeholder="" {...register('studio_country', { required: true })} />
                  </FloatingLabel>
                  <Button variant="primary" className='custom-button-inscription' type='submit'>
                    Valider</Button>
                </div>
              </Modal.Body>
            </form>
          </div>
        </Modal>
      </div>
      <div>
      <button><PencilFill style={{color: 'red'}} /> Modifier</button>
      </div>
    </>
  )
}

export default Studio
