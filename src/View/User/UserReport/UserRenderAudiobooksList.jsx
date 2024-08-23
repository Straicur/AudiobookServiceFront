import React from 'react';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function UserRenderAudiobooksList(props) {
  const createAudiobooksList = () => {
    let renderArray = [];

    if (props.audiobooks !== null) {
      props.audiobooks.audiobooks.forEach((audiobook) => {
        renderArray.push(createAudiobook(audiobook));
      });
    }
    return renderArray;
  };

  const createAudiobook = (audiobook) => {
    return (
      <div className='row' key={uuidv4()}>
        <div className='col'>{audiobook.title}</div>
        <div className='col'>{audiobook.author}</div>
        <div className='col'>{audiobook.parts}</div>
        <div className='col'>
          <Button
            name='en'
            variant='success'
            size='sm'
            className='btn button p-2 px-5 fs-6'
            onClick={() => {}}
          >
            {props.t('select')}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className='ms-1'>
      <ul className='list-group categories_add_list overflow-auto mx-5'>
        {createAudiobooksList()}
      </ul>
    </div>
  );
}
