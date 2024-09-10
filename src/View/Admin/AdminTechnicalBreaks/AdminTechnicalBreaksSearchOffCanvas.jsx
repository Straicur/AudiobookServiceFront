import React from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import AdminTechnicalBreaksService from 'Service/Admin/AdminTechnicalBreaksService';

export default function AdminTechnicalBreaksSearchOffCanvas(props) {
  const adminService = new AdminTechnicalBreaksService(props);

  return (
    <Offcanvas
      show={props.state.searchModal}
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
          <InputGroup.Text className='input-group-text-new-off-canvas text-light'>
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
          </Form.Select>
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new-off-canvas text-light'>
            {props.t('nameAndLastname')}
          </InputGroup.Text>
          <Form.Control
            name='nameOrLastname'
            value={props.searchState.nameOrLastname}
            onChange={(e) => {
              adminService.handleChange(e);
            }}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new-off-canvas text-light'>
            {props.t('dateFrom')}
          </InputGroup.Text>
          <Form.Control
            name='dateFrom'
            type='date'
            value={props.searchState.dateFrom}
            onChange={(e) => {
              adminService.handleChange(e);
            }}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new-off-canvas text-light'>
            {props.t('dateTo')}
          </InputGroup.Text>
          <Form.Control
            name='dateTo'
            type='date'
            value={props.searchState.dateTo}
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
