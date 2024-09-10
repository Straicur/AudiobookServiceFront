import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default function UserMainSearchAudiobooks(props) {
  const searchAudiobooks = () => {
    if (props.audiobooksState.searchText.length > 0) {
      props.setAudiobooksState((prev) => ({
        ...prev,
        search: true,
        searching: !props.audiobooksState.searching,
        page: 0,
      }));
      props.searchAllowed.current = true;
    } else {
      props.setAudiobooksState((prev) => ({
        ...prev,
        search: false,
        page: 0,
      }));
    }
  };

  const changeSearchText = (e) => {
    props.setAudiobooksState((prev) => ({
      ...prev,
      searchText: e.target.value,
    }));

    props.searchAllowed.current = false;
  };

  return (
    <div className='row ms-1 mt-3 justify-content-start'>
      <div className='col-2'>
        <InputGroup className='mb-3 '>
          <InputGroup.Text id='basic-addon1'>
            <i className='bi bi-search'></i>
          </InputGroup.Text>
          <Form.Control
            name='searchText'
            placeholder={props.t('title')}
            onChange={(e) => changeSearchText(e)}
            value={props.audiobooksState.searchText}
          />
          <Button className={'success_button'} onClick={searchAudiobooks}>
            {props.t('search')}
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}
