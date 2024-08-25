import React from 'react';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function UserRenderAudiobooksList(props) {
  const createAudiobooksList = () => {
    let renderArray = [];

    if (props.audiobooks !== null) {
      props.audiobooks.audiobooks.forEach((audiobook, index) => {
        renderArray.push(createAudiobook(audiobook, index));
      });
    }
    return renderArray;
  };

  const createAudiobook = (audiobook, index) => {
    return (
      <div
        className={
          props.audiobooks.audiobooks.length - 1 === index
            ? 'row mt-2 fs-4'
            : 'row  border-bottom mt-2 mb-2 pb-3 fs-4'
        }
        key={uuidv4()}
      >
        <div className='col-1'>{props.t('title')}:</div>
        <div className='col overflow-auto'>{audiobook.title}</div>
        <div className='col-2'>{props.t('author')}:</div>
        <div className='col overflow-auto'>{audiobook.author}</div>
        <div className='col-3'>
          <Button
            name='en'
            variant='success'
            size='sm'
            className='btn button p-2 px-5 fs-6'
            onClick={() => {
              props.setReportState((prev) => ({
                ...prev,
                choosenAudiobook: audiobook.Id,
                choosenAudiobookTitle: audiobook.title,
                choosenAudiobookAuthor: audiobook.author,
                openAudiobooksList: !props.reportState.openAudiobooksList,
              }));
            }}
          >
            {props.t('select')}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className='ms-1'>
      <ul className='list-group categories_add_list overflow-auto mb-4'>
        {createAudiobooksList()}
      </ul>
    </div>
  );
}
