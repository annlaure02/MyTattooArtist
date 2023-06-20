import { useDropzone } from 'react-dropzone';
import React, { useContext, useState, useEffect } from 'react'
import { PlusLg } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { ArtistContext } from '../header/ArtistAuth';
import '../../styles/private-artist-page/Pseudo.css'

function Drawing({ dataUpdated }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setSelectedFiles([])
    setFiles([])
    setShow(true)
  };

  const { register, handleSubmit } = useForm();

  const { artistId } = useContext(ArtistContext);

  // states for the dropzone
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [files, setFiles] = useState([]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', data.drawing[0]);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('uploaded_images_drawing', selectedFiles[i]);
    }

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

  // handle dropzone
  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    maxFiles: 5,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    onDrop: (acceptedFiles) => {
      setSelectedFiles(acceptedFiles);
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  /* previews picture */
  const previewFile = files.map(file => (
    <div key={file.path}>
      <img
        src={file.preview}
        alt={file.path}
        onLoad={() => { URL.revokeObjectURL(file.preview) }}
        height={100}
        />
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <div>
        <button className='add-button' onClick={handleShow}>
          <PlusLg className='plus-icon' /> Ajouter
        </button>
        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          id='artist-modal'
        >
          <div className='custom-modal-inside'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
                <div className='form-container'>
                  <section className="container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p>Glissez vos photos ou  Cliquez pour les sélectionner</p>
                      <em>(5 fichiers maximum)</em>
                    </div>
                    <aside>
                      {previewFile}
                    </aside>
                  </section>
                  <input name="drawing" {...register("drawing")} /> <br />
                  <Button variant="primary" className='custom-button-inscription' type='submit'>
                    Valider</Button>
                </div>
              </Modal.Body>
            </form>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Drawing
