import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export default function SearchUsersOffCanvas(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    props.setState({
      ...props.state,
      searchModal: !props.state.searchModal,
    });
    props.resetSearchStates();

    setShow(false);
  };

  const changeSort = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        order: parseInt(element.target.value),
      });
    }
  };

  const changeEmail = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        email: element.target.value,
      });
    }
  };

  const changePhoneNumber = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        phoneNumber: element.target.value,
      });
    }
  };

  const changeFirstname = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        firstname: element.target.value,
      });
    }
  };

  const changeLastname = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        lastname: element.target.value,
      });
    }
  };

  const changeActive = (element) => {
    if (props.searchState.active == null) {
      props.setSearchState({
        ...props.searchState,
        active: element.target.checked,
      });
    } else {
      props.setSearchState({
        ...props.searchState,
        active: !props.searchState.active,
      });
    }
  };

  const changeBanned = (element) => {
    if (props.searchState.banned == null) {
      props.setSearchState({
        ...props.searchState,
        banned: element.target.checked,
      });
    } else {
      props.setSearchState({
        ...props.searchState,
        banned: !props.searchState.banned,
      });
    }
  };

  const searchAgain = () => {
    props.setState({ ...props.state, refresh: !props.state.refresh });
    setShow(false);
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      className='bg-dark text-light off_canvas_with'
      backdrop='static'
      placement='end'
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <div className='row'>
            <div className='col'>
              <h2>{props.t('filters')}</h2>
            </div>
            <div className='col'>
              <Button
                variant='success'
                size='sm'
                color='success'
                className=' btn button mt-2'
                onClick={props.resetSearchStates}
              >
                {props.t('reset')}
              </Button>
            </div>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <InputGroup className='mb-1 input_modal py-1'>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('sort')}
          </InputGroup.Text>
          <Form.Select
            onChange={(e) => {
              changeSort(e);
            }}
            value={props.searchState.sort}
          >
            <option value={0}>{props.t('selectSort')}</option>
            <option value={1}>{props.t('latest')}</option>
            <option value={2}>{props.t('oldest')}</option>
            <option value={3}>{props.t('aplhabeticalAsc')}</option>
            <option value={4}>{props.t('aplhabeticalDesc')}</option>
          </Form.Select>
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('email')}
          </InputGroup.Text>
          <Form.Control
            value={props.searchState.title}
            onChange={(e) => {
              changeEmail(e);
            }}
          />
        </InputGroup>

        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('phoneNumber')}
          </InputGroup.Text>
          <Form.Control
            value={props.searchState.author}
            onChange={(e) => {
              changePhoneNumber(e);
            }}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('firstname')}
          </InputGroup.Text>
          <Form.Control
            value={props.searchState.album}
            onChange={(e) => {
              changeFirstname(e);
            }}
          />
        </InputGroup>

        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('lastname')}
          </InputGroup.Text>
          <Form.Control
            onChange={(e) => {
              changeLastname(e);
            }}
            value={props.searchState.parts}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <Form.Check
            type='switch'
            id='custom-switch'
            label={
              props.searchState.active != null && props.searchState.active
                ? props.t('active')
                : props.t('notActive')
            }
            checked={props.searchState.active != null && props.searchState.active}
            onChange={(e) => changeActive(e)}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <Form.Check
            type='switch'
            id='custom-switch'
            label={
              props.searchState.banned != null && props.searchState.banned
                ? props.t('banned')
                : props.t('notBanned')
            }
            checked={props.searchState.banned != null && props.searchState.banned}
            onChange={(e) => changeBanned(e)}
          />
        </InputGroup>
        <div className='row mx-1'>
          <Button
            variant='success'
            size='lg'
            color='success'
            className=' btn button mt-2'
            onClick={() => searchAgain()}
          >
            {props.t('search')}
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
