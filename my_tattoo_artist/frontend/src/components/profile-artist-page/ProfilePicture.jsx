import React, { useContext, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { ArtistContext } from '../header/ArtistAuth';
import '../../styles/private-artist-page/Modal.css'
import '../../styles/private-artist-page/Buttons.css'

function ProfilePicture({ dataUpdated }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit } = useForm();

  const { artistId } = useContext(ArtistContext);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('profile_picture', data.profile_picture[0]);

    const url = `http://127.0.0.1:8000/api/ma-page-artiste/${artistId}/`
    try {
      if (artistId) {
        const updateResponse = await fetch(url, {
          method: 'PUT',
          body: formData
        });

        if (updateResponse.ok) {
          const responseData = await updateResponse.json();
          dataUpdated(responseData);
        } else {
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
          <FaPlus className='plus-icon' />
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
                  <Form.Group controlId="profile_picture" className="mb-3">
                    <Form.Label>Photo de profil</Form.Label>
                    <Form.Control
                      type="file"
                      {...register('profile_picture', { required: true })} />
                  </Form.Group>
                  <Button variant="primary" className='custom-button-inscription' type='submit'>
                    Valider</Button>
                </div>
              </Modal.Body>
            </form>
          </div>
        </Modal>
      </div>
      <div>
        <button className='pencil-button'>
          <BsPencilFill className='pencil-icon' />
        </button>
      </div>
    </>
  )
}

export default ProfilePicture
