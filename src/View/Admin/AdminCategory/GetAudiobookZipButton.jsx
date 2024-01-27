import React from 'react';
import Button from 'react-bootstrap/Button';
import { HandleFetch } from '../../../Util/HandleFetch';

export default function GetAudiobookZipButton(props) {
  const getZip = () => {
    HandleFetch(
      '/admin/audiobook/zip',
      'POST',
      {
        audiobookId: props.audiobookDetail.id,
      },
      props.token,
      props.i18n.language,
    )
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const link = document.createElement('a');

        link.href = url;

        link.setAttribute('download', 'YourAudiobook.zip');

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      })
      .catch((e) => {
        props.setAudiobooksState({
          ...props.setAudiobooksState,
          error: e,
        });
        props.handleClose();
      });
  };

  return (
    <Button name='en' size='sm' className='btn button primary_button' onClick={getZip}>
      {props.t('downloadZip')}
    </Button>
  );
}
