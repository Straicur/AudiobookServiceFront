import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import AdminCategoriesRenderService from 'Service/Admin/AdminCategoriesRenderService';

export default function AdminCategoriesRenderList(props) {
  const navigate = useNavigate();

  const adminService = new AdminCategoriesRenderService(props);

  const createTree = () => {
    let renderArray = [];
    let kids = [];

    if (props.categories !== null && props.categories.categories !== null) {
      recursiveTree(props.categories.categories, renderArray, kids, null);
    }

    return renderArray;
  };

  function recursiveTree(array, renderArray, kids, parent = null) {
    let returnArray = [];

    for (const element of array) {
      let elementArray = [];
      let children = [];

      elementArray.push = element;

      if (element['children'].length != 0) {
        let returnedChildren = recursiveTree(element['children'], renderArray, kids, element);

        for (const [index, value] of returnedChildren.entries()) {
          let childElement = [
            createListElement(index, value.push, returnedChildren.length, element),
          ];

          if (kids[element.id] != undefined) {
            let ul = kids[element.id].filter((x) => x.type === 'li');

            if (
              !ul.some((cat) =>
                cat.props.children[1] != undefined
                  ? cat.props.children[1].props['data-name'] === value.push.name
                  : false,
              )
            ) {
              kids[element.id] = kids[element.id].concat(childElement);
            }
          } else {
            kids[element.id] = childElement;
          }

          elementArray['child'] = value;
        }

        if (Object.keys(kids).some((key) => key === element.id)) {
          for (const iterator of kids[element.id]) {
            children.push(iterator);
          }
        }

        if (element.parentCategoryKey === null || element.parentCategoryKey === '') {
          renderArray.push(listParent(element, children, parent));
        } else {
          let parentElement = [listParent(element, children, parent)];

          if (kids[parent.id] != undefined) {
            kids[parent.id] = kids[parent.id].concat(parentElement);
          } else {
            kids[parent.id] = parentElement;
          }
        }
      } else {
        if (element.parentCategoryKey === null || element.parentCategoryKey === '') {
          renderArray.push(listParent(element, children, parent));
        }
      }
      returnArray.push(elementArray);
    }
    return returnArray;
  }

  function listParent(element, child, parent) {
    const inReloadArray = props.lastOpenedCategories.current[element.id] !== undefined;
    const parentInArray =
      parent !== null && props.lastOpenedCategories.current[parent.id] !== undefined;

    return (
      <li
        key={uuidv4()}
        className={
          parent === null || inReloadArray || parentInArray
            ? 'visible border border-1 border-dark list-group-item'
            : 'd-none border border-1 border-dark list-group-item'
        }
        data-clicable={!inReloadArray}
      >
        <div className='d-flex align-items-center flex-row bd-highlight'>
          <div
            className='d-flex align-items-center flex-row'
            onClick={(e) => adminService.oparateParentList(e, child.length, element, parent)}
          >
            {child.length > 0 ? (
              <i
                className={
                  inReloadArray
                    ? 'fs-3 p-1 bi bi-arrow-down-square'
                    : 'fs-3 p-1 bi bi-arrow-right-square'
                }
              ></i>
            ) : null}
            <div className='p-2 bd-highlight'>
              <h5>{props.t('categoryName')}:</h5>
            </div>
            <div className='p-1 bd-highlight name_color fs-5'>
              <h5>{element.name}</h5>
            </div>
            <div className='p-2 bd-highlight'>
              <h5>{props.t('categoryActive')}:</h5>
            </div>
            <div className='p-2 bd-highlight'>
              {element.active ? (
                <h5>
                  <i className='bi bi-bookmark-check-fill'></i>
                </h5>
              ) : (
                <h5>
                  <i className='bi bi-bookmark-dash'></i>
                </h5>
              )}
            </div>
            <div className='p-2 bd-highlight'>
              <h5>{props.t('categoryKey')}:</h5>
            </div>
            <div className='p-2 bd-highlight fs-5'>
              <h5 className='fw-normal'>{element.categoryKey}</h5>
            </div>
            <div className='p-2 bd-highlight'>
              <h5>{props.t('categoryChilds')}:</h5>
            </div>
            <div className='p-2 bd-highlight'>
              <h5 className='fw-normal'>{element.children.length}</h5>
            </div>
            <div className='p-2 bd-highlight'>
              <h5>{props.t('audiobooksAmount')}:</h5>
            </div>
            <div className='p-2 bd-highlight'>
              <h5 className='fw-normal'>{element.audiobooks}</h5>
            </div>
          </div>
          <div className='d-flex align-items-center flex-row'>
            <div className='p-2 bd-highlight ms-3'>
              <Button
                name='en'
                variant='warning'
                size='lg'
                className='btn button'
                onClick={() => {
                  props.setState((prev) => ({
                    ...prev,
                    editCategoryModal: !props.state.editCategoryModal,
                    editCategoryElement: element,
                  }));
                }}
              >
                {props.t('edit')}
              </Button>
            </div>
            <div className='p-2 bd-highlight ms-3'>
              <Button
                name='en'
                variant='dark'
                size='lg'
                className='btn button'
                onClick={() => {
                  navigate(`/admin/category/${element.categoryKey}`);
                }}
              >
                {props.t('audiobooks')}
              </Button>
            </div>
            <div className='p-2 bd-highlight ms-3'>
              <Button
                name='en'
                variant='success'
                size='lg'
                className='btn button'
                onClick={() =>
                  props.setState((prev) => ({
                    ...prev,
                    addCategoryModal: !props.state.addCategoryModal,
                    addCategoryParent: element,
                  }))
                }
              >
                {props.t('addChildCategory')}
              </Button>
            </div>
          </div>
        </div>

        <ul className='list-group' data-name={element.name}>
          {child}
        </ul>
      </li>
    );
  }

  function createListElement(index, element, arrayLength, parent) {
    const inReloadArray =
      parent != null && props.lastOpenedCategories.current[parent.id] !== undefined;

    let css = '';
    if (arrayLength === 1) {
      if (inReloadArray) {
        css = 'p-2 border border-1 border-warning list-group-item';
      } else {
        css = 'd-none p-2 border border-1 border-warning list-group-item';
      }
    } else if (index + 1 === arrayLength) {
      if (inReloadArray) {
        css = 'p-2 border border-1 border-info list-group-item';
      } else {
        css = 'd-none p-2 border border-1 border-info list-group-item';
      }
    } else {
      if (inReloadArray) {
        css = 'p-2 border border-1 border-bottom-0 border-info list-group-item';
      } else {
        css = 'd-none p-2 border border-1 border-bottom-0 border-info list-group-item';
      }
    }

    return (
      <li key={uuidv4()} className={css} id={element.id}>
        <div className='d-flex flex-row align-items-center bd-highlight'>
          <div className='p-2 bd-highlight'>
            <h5>{props.t('categoryName')}:</h5>
          </div>
          <div className='p-1 bd-highlight name_color fs-5'>
            <h5>{element.name}</h5>
          </div>
          <div className='p-2 bd-highlight'>
            <h5>{props.t('categoryActive')}:</h5>
          </div>
          <div className='p-2 bd-highlight'>
            {element.active ? (
              <h5>
                <i className='bi bi-bookmark-check-fill'></i>
              </h5>
            ) : (
              <h5>
                <i className='bi bi-bookmark-dash'></i>
              </h5>
            )}
          </div>
          <div className='p-2 bd-highlight'>
            <h5>{props.t('categoryKey')}:</h5>
          </div>
          <div className='p-2 bd-highlight'>
            <h5 className='fw-normal'>{element.categoryKey}</h5>
          </div>
          <div className='p-2 bd-highlight'>
            <h5>{props.t('categoryChilds')}:</h5>
          </div>
          <div className='p-2 bd-highlight'>
            <h5 className='fw-normal'>{element.children.length}</h5>
          </div>
          <div className='p-2 bd-highlight'>
            <h5>{props.t('audiobooksAmount')}:</h5>
          </div>
          <div className='p-2 bd-highlight'>
            <h5 className='fw-normal'>{element.audiobooks}</h5>
          </div>
          <div className='p-2 bd-highlight ms-2'>
            <Button
              name='en'
              variant='warning'
              size='lg'
              className='btn button'
              onClick={() => {
                props.setState((prev) => ({
                  ...prev,
                  editCategoryModal: !props.state.editCategoryModal,
                  editCategoryElement: element,
                }));
              }}
            >
              {props.t('edit')}
            </Button>
          </div>
          <div className='p-2 bd-highlight ms-2'>
            <Button
              name='en'
              variant='dark'
              size='lg'
              className='btn button'
              onClick={() => {
                navigate(`/admin/category/${element.categoryKey}`);
              }}
            >
              {props.t('audiobooks')}
            </Button>
          </div>
          <div className='p-2 bd-highlight ms-2'>
            <Button
              name='en'
              variant='success'
              size='lg'
              className='btn button'
              onClick={() => {
                props.setState((prev) => ({
                  ...prev,
                  addCategoryModal: !props.state.addCategoryModal,
                  addCategoryParent: element,
                }));
              }}
            >
              {props.t('addChildCategory')}
            </Button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <div>
      <ul className='list-group'>{createTree()}</ul>
    </div>
  );
}
