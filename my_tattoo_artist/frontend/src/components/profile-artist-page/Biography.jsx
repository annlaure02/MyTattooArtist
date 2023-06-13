import React, { useContext, useState } from 'react'
import { PencilFill, PlusLg } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { ArtistContext } from '../header/ArtistAuth';
import '../../styles/private-artist-page/Pseudo.css'

function Biography({ dataUpdated }) {
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
                  <FloatingLabel controlId="biography" label="Ma biographie" className="mb-3" >
                    <Form.Control as="textarea" placeholder="" style={{height: '200px'}} {...register('biography', { required: true })} />
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

export default Biography
