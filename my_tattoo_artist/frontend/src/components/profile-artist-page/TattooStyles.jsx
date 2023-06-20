import React, { useContext, useState, useEffect } from 'react'
import { PencilFill, PlusLg } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { ArtistContext } from '../header/ArtistAuth';
import '../../styles/private-artist-page/Pseudo.css'

function TattooStyles({ dataUpdated }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [styles, setStyles] = useState([])

  const { register, handleSubmit } = useForm();

  const { artistId } = useContext(ArtistContext)



  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/tattoo-style/`)
      const data = await response.json()
      setStyles(data)
    };
    fetchData()
  }, [])

  const onSubmit = async (data) => {
    const selectedStyles = data.tattoo_style;

    const requestData = selectedStyles.map((styleName) => {
      const style = styles.find((s) => s.style_name === styleName);
      return style;
    });

    const url = `http://127.0.0.1:8000/api/ma-page-artiste/${artistId}/`
    try {
      if (artistId) {
        const updateResponse = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ tattoo_style: requestData })
        });

        if (updateResponse.ok) {
          const responseData = await updateResponse.json();
          console.log(responseData)
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
          <PlusLg className='plus-icon' /> Ajouter
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
                  <Form.Group>
                    <h3>Sélectionne tes styles</h3>
                    {styles.map(style => (
                      <Form.Check
                        key={style.id}
                        type="checkbox"
                        id={`style-${style.id}`}
                        label={style.style_name}
                        value={style.style_name}
                        {...register('tattoo_style')}
                      />
                    ))}
                  </Form.Group>
                  <br />
                  <Button variant="primary" className='custom-button-inscription' type='submit'>
                    Valider</Button>
                </div>
              </Modal.Body>
            </form>
          </div>
        </Modal>
      </div>
      <div>
        <button><PencilFill style={{ color: 'red' }} /> Modifier</button>
      </div>
    </>
  )
}

export default TattooStyles
