import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { HandleFetch } from 'Util/HandleFetch';
import { Buffer } from 'buffer';

export default function AdminAudiobookCover(props) {
  const handleOnFileChange = (e) => {
    if (e.target.files) {
      let file = e.target.files[0];

      if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/jpg') {
        props.setAudiobookState((prev) => ({
          ...prev,
          file: file,
        }));
      }
    }
  };

  const editCover = () => {
    if (props.audiobookState.file != null) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target.result instanceof ArrayBuffer) {
          let pattern = 'jpeg|png|jpg/i';
          let result = props.audiobookState.file.type.match(pattern);

          if (result != null) {
            let buf = new Uint8Array(e.target.result);
            let b64 = Buffer.from(buf).toString('base64');

            HandleFetch(
              '/admin/audiobook/change/cover',
              'PATCH',
              {
                type: result[0],
                base64: b64,
                audiobookId: props.audiobookDetail.id,
              },
              props.token,
              props.i18n.language,
            )
              .then(() => {
                props.setAudiobookCoverRefetch();

                props.setAudiobookState((prev) => ({
                  ...prev,
                  file: null,
                  errorCover: '',
                }));
              })
              .catch((e) => {
                props.setAudiobookState((prev) => ({
                  ...prev,
                  errorCover: e,
                }));
              });
          }
        }
      };
      if (props.audiobookState.file != null) {
        reader.readAsArrayBuffer(props.audiobookState.file);
      }
    }
  };

  return (
    <div className='row '>
      <div className='row '>
        <img
          src={
            props.audiobookDetail === undefined ||
            props.audiobookDetail.imgFile == null ||
            props.audiobookDetail.imgFile == ''
              ? '/noImg.jpg'
              : process.env.REACT_APP_API_URL + props.audiobookDetail.imgFile
          }
          className='card-img-top'
          alt='...'
        />
      </div>
      <div className='row d-flex justify-content-center'>
        <Form.Group controlId='formFileSm' className='mt-2'>
          <Form.Control onChange={handleOnFileChange} type='file' size='sm' />
        </Form.Group>
        <Button
          name='en'
          variant='secondary'
          size='sm'
          className='btn button px-4 my-2 audiobook_detail_modal_button'
          disabled={props.audiobookState.file == null}
          onClick={editCover}
        >
          {props.t('editCover')}
        </Button>
      </div>
    </div>
  );
}
