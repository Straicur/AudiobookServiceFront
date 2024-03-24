import React from 'react';
import Button from 'react-bootstrap/Button';
import { HandleFetch } from 'Util/HandleFetch';

export default function ZipButton(props) {
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

        link.setAttribute('download', props.audiobookDetail.title + '.zip');

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      })
      .catch((e) => {
        props.setState((prev) => ({
          ...prev,
          error: e,
        }));

        if (props.handleClose != null) {
          props.handleClose();
        }
      });
  };

  const cssValue = 'btn button ' + props.cssData;

  return (
    <Button name='en' size='sm' className={cssValue} onClick={getZip}>
      {props.t('downloadZip')}
    </Button>
  );
}
