import React from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
import AdminAudiobooksSearchService from 'Service/Admin/AdminAudiobooksSearchService';

export default function AdminAudiobooksSearchOffCanvas(props) {
  const adminService = new AdminAudiobooksSearchService(props);

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
                onClick={() => AdminAudiobooksSearchService.resetSearchStates(props.setSearchState)}
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
            name='sort'
            onChange={(e) => {
              adminService.handleChange(e);
            }}
            value={props.searchState.sort}
          >
            <option value={0}>{props.t('selectSort')}</option>
            <option value={1}>{props.t('popular')}</option>
            <option value={2}>{props.t('lestPopular')}</option>
            <option value={3}>{props.t('latest')}</option>
            <option value={4}>{props.t('oldest')}</option>
            <option value={5}>{props.t('aplhabeticalAsc')}</option>
            <option value={6}>{props.t('aplhabeticalDesc')}</option>
            <option value={7}>{props.t('topRated')}</option>
            <option value={8}>{props.t('worstRated')}</option>
          </Form.Select>
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new-off-canvas text-light'>
            {props.t('title')}
          </InputGroup.Text>
          <Form.Control
            name='title'
            value={props.searchState.title}
            onChange={(e) => {
              adminService.handleChange(e);
            }}
          />
        </InputGroup>

        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new-off-canvas text-light'>
            {props.t('author')}
          </InputGroup.Text>
          <Form.Control
            name='author'
            value={props.searchState.author}
            onChange={(e) => {
              adminService.handleChange(e);
            }}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new-off-canvas text-light'>
            {props.t('album')}
          </InputGroup.Text>
          <Form.Control
            name='album'
            value={props.searchState.album}
            onChange={(e) => {
              adminService.handleChange(e);
            }}
          />
        </InputGroup>

        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new-off-canvas text-light'>
            {props.t('parts')}
          </InputGroup.Text>
          <Form.Control
            type='number'
            name='parts'
            onChange={(e) => {
              adminService.handleChange(e);
            }}
            value={props.searchState.parts}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new-off-canvas text-light'>
            {props.t('age')}
          </InputGroup.Text>
          <Form.Select
            name='age'
            onChange={(e) => {
              adminService.handleChange(e);
            }}
            value={props.searchState.age}
          >
            <option value={0}> {props.t('selectedAge')}</option>
            <option value={1}>3-7</option>
            <option value={2}>7-12</option>
            <option value={3}>12-16</option>
            <option value={4}>16-18</option>
            <option value={5}>18+</option>
          </Form.Select>
        </InputGroup>

        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new-off-canvas text-light'>
            {props.t('year')}
          </InputGroup.Text>
          <Form.Control
            name='year'
            type='date'
            value={props.searchState.year}
            onChange={(e) => {
              adminService.handleChange(e);
            }}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          {props.t('duration')}: {adminService.formatDuration()}
          <Form.Range
            name='duration'
            onChange={(e) => {
              adminService.handleChange(e);
            }}
            min={0}
            max={86399}
            step={1}
            value={props.searchState.duration}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('categories')}
          </InputGroup.Text>
          <DropdownMultiselect
            placeholder={props.t('selectCategories')}
            placeholderMultipleChecked={props.t('selectedMultiCategories')}
            selectDeselectLabel={props.t('selectedAll')}
            options={adminService.generateCategoriesList()}
            name='categories'
            handleOnChange={(e) => {
              adminService.changeCategories(e);
            }}
            selected={props.searchState.categories}
            className={'dropdown_multiselect'}
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
