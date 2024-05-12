import React from 'react';
import Button from 'react-bootstrap/Button';

export default function ZipButton(props) {
  const cssValue = 'btn button ' + props.cssData;

  return (
    <Button
      name='en'
      size='sm'
      className={cssValue}
      onClick={() =>
        props.getAudiobookZip({
          audiobookId: props.audiobookDetail.id,
          props: props,
        })
      }
    >
      {props.t('downloadZip')}
    </Button>
  );
}
