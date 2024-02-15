import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import AdminUsersSearchService from 'Service/Admin/AdminUsersSearchService';

export default function AdminUsersSearchOffCanvas(props) {
  const [show, setShow] = useState(true);

  const adminService = new AdminUsersSearchService(props, setShow);

  return (
    <Offcanvas
      show={show}
      onHide={adminService.handleClose}
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
            name='order'
            value={props.searchState.order}
            onChange={(e) => {
              adminService.handleChangeInt(e);
            }}
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
            name='email'
            value={props.searchState.email}
            onChange={(e) => {
              adminService.handleChange(e);
            }}
          />
        </InputGroup>

        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('phoneNumber')}
          </InputGroup.Text>
          <Form.Control
            name='phoneNumber'
            value={props.searchState.phoneNumber}
            onChange={(e) => {
              adminService.handleChange(e);
            }}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('firstname')}
          </InputGroup.Text>
          <Form.Control
            name='firstname'
            value={props.searchState.firstname}
            onChange={(e) => {
              adminService.handleChange(e);
            }}
          />
        </InputGroup>

        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('lastname')}
          </InputGroup.Text>
          <Form.Control
            name='lastname'
            value={props.searchState.lastname}
            onChange={(e) => {
              adminService.handleChange(e);
            }}
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
            onChange={(e) => adminService.changeActive(e)}
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
            onChange={(e) => adminService.changeBanned(e)}
          />
        </InputGroup>
        <div className='row mx-1'>
          <Button
            variant='success'
            size='lg'
            color='success'
            className=' btn button mt-2'
            onClick={() => adminService.searchAgain()}
          >
            {props.t('search')}
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
