import React from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormService from 'Service/Common/FormService';

export default function AdminReportsSearchOffCanvas(props) {
  const adminService = new FormService(props.setSearchState);

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      searchModal: !props.state.searchModal,
    }));
  };

  const changeUser = (element) => {
    if (element.target.checked) {
      props.setSearchState((prev) => ({
        ...prev,
        user: element.target.checked,
      }));
    } else {
      props.setSearchState((prev) => ({
        ...prev,
        user: null,
      }));
    }
  };

  const changeNotUser = (element) => {
    if (element.target.checked) {
      props.setSearchState((prev) => ({
        ...prev,
        user: !element.target.checked,
      }));
    } else {
      props.setSearchState((prev) => ({
        ...prev,
        user: null,
      }));
    }
  };
  const changeDenied = (element) => {
    if (element.target.checked) {
      props.setSearchState((prev) => ({
        ...prev,
        denied: element.target.checked,
      }));
    } else {
      props.setSearchState((prev) => ({
        ...prev,
        denied: null,
      }));
    }
  };

  const changeNotDenied = (element) => {
    if (element.target.checked) {
      props.setSearchState((prev) => ({
        ...prev,
        denied: !element.target.checked,
      }));
    } else {
      props.setSearchState((prev) => ({
        ...prev,
        denied: null,
      }));
    }
  };
  const changeAccepted = (element) => {
    if (element.target.checked) {
      props.setSearchState((prev) => ({
        ...prev,
        accepted: element.target.checked,
      }));
    } else {
      props.setSearchState((prev) => ({
        ...prev,
        accepted: null,
      }));
    }
  };

  const changeNotAccepted = (element) => {
    if (element.target.checked) {
      props.setSearchState((prev) => ({
        ...prev,
        accepted: !element.target.checked,
      }));
    } else {
      props.setSearchState((prev) => ({
        ...prev,
        accepted: null,
      }));
    }
  };
  const searchAgain = () => {
    props.setReportsState((prev) => ({
      ...prev,
      page: 0,
      refresh: true,
    }));

    props.setState((prev) => ({
      ...prev,
      searchModal: !props.state.searchModal,
    }));

    props.refetch();
  };

  return (
    <Offcanvas
      show={props.state.searchModal}
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
                onClick={() => props.resetSearchStates()}
              >
                {props.t('reset')}
              </Button>
            </div>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
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
            {props.t('actionId')}
          </InputGroup.Text>
          <Form.Control
            name='actionId'
            value={props.searchState.actionId}
            onChange={(e) => {
              adminService.handleChange(e);
            }}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('description')}
          </InputGroup.Text>
          <Form.Control
            name='description'
            value={props.searchState.description}
            onChange={(e) => {
              adminService.handleChange(e);
            }}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('ip')}
          </InputGroup.Text>
          <Form.Control
            name='ip'
            value={props.searchState.ip}
            onChange={(e) => {
              adminService.handleChange(e);
            }}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
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
          <InputGroup.Text className='input-group-text-new text-light'>
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
        <InputGroup className='mb-1 input_modal py-1'>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('type')}
          </InputGroup.Text>
          <Form.Select
            name='type'
            onChange={(e) => {
              adminService.handleChangeInt(e);
            }}
            value={props.searchState.type}
          >
            <option value={0}>{props.t('selectType')}</option>
            <option value={1}>{props.t('reportTypeComment')}</option>
            <option value={2}>{props.t('reportTypeAudiobook')}</option>
            <option value={3}>{props.t('reportTypeCategory')}</option>
            <option value={4}>{props.t('reportTypeSystem')}</option>
            <option value={5}>{props.t('reportTypeUser')}</option>
            <option value={6}>{props.t('reportTypeSettings')}</option>
            <option value={7}>{props.t('reportTypeRecruitment')}</option>
            <option value={8}>{props.t('reportTypeOther')}</option>
          </Form.Select>
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1'>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('sort')}
          </InputGroup.Text>
          <Form.Select
            name='order'
            onChange={(e) => {
              adminService.handleChangeInt(e);
            }}
            value={props.searchState.order}
          >
            <option value={0}>{props.t('selectSort')}</option>
            <option value={1}>{props.t('latest')}</option>
            <option value={2}>{props.t('oldest')}</option>
          </Form.Select>
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <Form.Check
            type='switch'
            id='custom-switch'
            label={props.t('systemUser')}
            checked={props.searchState.user != null && props.searchState.user}
            onChange={(e) => changeUser(e)}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <Form.Check
            type='switch'
            id='custom-switch'
            label={props.t('notSystemUser')}
            checked={props.searchState.user != null && !props.searchState.user}
            onChange={(e) => changeNotUser(e)}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <Form.Check
            type='switch'
            id='custom-switch'
            label={props.t('accepted')}
            checked={props.searchState.accepted != null && props.searchState.accepted}
            onChange={(e) => changeAccepted(e)}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <Form.Check
            type='switch'
            id='custom-switch'
            label={props.t('notAccepted')}
            checked={props.searchState.accepted != null && !props.searchState.accepted}
            onChange={(e) => changeNotAccepted(e)}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <Form.Check
            type='switch'
            id='custom-switch'
            label={props.t('denied')}
            checked={props.searchState.denied != null && props.searchState.denied}
            onChange={(e) => changeDenied(e)}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <Form.Check
            type='switch'
            id='custom-switch'
            label={props.t('notDenied')}
            checked={props.searchState.denied != null && !props.searchState.denied}
            onChange={(e) => changeNotDenied(e)}
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
