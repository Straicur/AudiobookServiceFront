import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
import { useLastSearchStore } from '../../../Store/store';

export default function SearchAudiobooksOffCanvas(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    props.setState({
      ...props.state,
      searchModal: !props.state.searchModal,
    });
    setShow(false);
  };

  const searchStore = useLastSearchStore();

  const searchData = useLastSearchStore((state) => state.search);
  const searchDateUpdate = useLastSearchStore((state) => state.dateUpdate);

  const generateCategoriesList = () => {
    let multiSelectTable = [];

    props.categoriesState.forEach((element) => {
      multiSelectTable.push({ key: element.id, label: element.name });
    });
    return multiSelectTable;
  };

  const changeSort = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        sort: element.target.value,
      });
    }
  };

  const changeCategories = (element) => {
    if (element != NaN && element != undefined) {
      props.setSearchState({
        ...props.searchState,
        categories: element,
      });
    }
  };

  const changeTitle = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        title: element.target.value,
      });
    }
  };

  const changeAuthor = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        author: element.target.value,
      });
    }
  };

  const changeAlbum = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        album: element.target.value,
      });
    }
  };

  const changeParts = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        parts: element.target.value,
      });
    }
  };

  const changeAge = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        age: element.target.value,
      });
    }
  };

  const changeYear = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        year: element.target.value,
      });
    }
  };

  const changeDuration = (element) => {
    if (element.target.value != NaN && element.target.value != undefined) {
      props.setSearchState({
        ...props.searchState,
        duration: element.target.value,
      });
    }
  };

  const formatDuration = () => {
    return new Date(props.searchState.duration * 1000).toISOString().slice(11, 19);
  };

  const searchAgain = () => {
    searchStore.setSearch(props.searchState);

    props.setPageState({
      ...props.pageState,
      page: 0,
    });

    props.setState({
      ...props.state,
      searchModal: !props.state.searchModal,
      refresh: !props.state.refresh,
    });
    setShow(false);
  };

  useEffect(() => {
    if (
      searchData != null &&
      searchData != undefined &&
      searchDateUpdate > Date.now() &&
      searchDateUpdate != 0
    ) {
      props.setSearchState(searchData);
    }
  }, []);

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
                onClick={() => props.resetSearchStates()}
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
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('categories')}
          </InputGroup.Text>
          <DropdownMultiselect
            placeholder={props.t('selectCategories')}
            placeholderMultipleChecked={props.t('slectedMultiCategories')}
            selectDeselectLabel={props.t('slectedAll')}
            options={generateCategoriesList()}
            name='countries'
            handleOnChange={(e) => {
              changeCategories(e);
            }}
            selected={props.searchState.categories}
            className={'dropdown_multiselect'}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('title')}
          </InputGroup.Text>
          <Form.Control
            value={props.searchState.title}
            onChange={(e) => {
              changeTitle(e);
            }}
          />
        </InputGroup>

        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('author')}
          </InputGroup.Text>
          <Form.Control
            value={props.searchState.author}
            onChange={(e) => {
              changeAuthor(e);
            }}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('album')}
          </InputGroup.Text>
          <Form.Control
            value={props.searchState.album}
            onChange={(e) => {
              changeAlbum(e);
            }}
          />
        </InputGroup>

        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('parts')}
          </InputGroup.Text>
          <Form.Control
            type='number'
            onChange={(e) => {
              changeParts(e);
            }}
            value={props.searchState.parts}
          />
        </InputGroup>

        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('age')}
          </InputGroup.Text>
          <Form.Select
            onChange={(e) => {
              changeAge(e);
            }}
            value={props.searchState.age}
          >
            <option value={0}> {props.t('slelectAge')}</option>
            <option value={1}>3-7</option>
            <option value={2}>7-12</option>
            <option value={3}>12-16</option>
            <option value={4}>16-18</option>
            <option value={5}>18+</option>
          </Form.Select>
        </InputGroup>

        <InputGroup className='mb-1 input_modal py-1 '>
          <InputGroup.Text className='input-group-text-new text-light'>
            {props.t('year')}
          </InputGroup.Text>
          <Form.Control
            type='date'
            value={props.searchState.year}
            onChange={(e) => {
              changeYear(e);
            }}
          />
        </InputGroup>
        <InputGroup className='mb-1 input_modal py-1 '>
          {props.t('duration')}: {formatDuration()}
          <Form.Range
            onChange={(e) => {
              changeDuration(e);
            }}
            min={0}
            max={86399}
            step={1}
            value={props.searchState.duration}
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
