import React from 'react';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import AdminAudiobookRenderCategoriesService from 'Service/Admin/AdminAudiobookRenderCategoriesService';

export default function AdminAudiobookRenderCategoriesList(props) {
  const adminService = new AdminAudiobookRenderCategoriesService(props);

  const createTree = () => {
    let renderArray = [];
    let kids = [];

    if (props.categories !== null) {
      recursiveTree(props.categories.categories, renderArray, kids, null);
    }

    return renderArray;
  };

  function listParent(element, child, parent) {
    const usedInRefCategory = props.categoriesId.current.filter((x) => x === element.id).length;
    const usedInitialCategory = props.audiobookDetail.categories.filter(
      (x) => x.id === element.id,
    ).length;
    const inReloadArray = props.lastOpenedCategories.current[element.id] !== undefined;
    const parentInArray =
      parent !== null && props.lastOpenedCategories.current[parent.id] !== undefined;

    return (
      <li
        key={uuidv4()}
        className={
          parent === null || inReloadArray || parentInArray
            ? 'visible border border-4 border-secondary list-group-item'
            : 'd-none border border-4 border-secondary list-group-item'
        }
        data-clicable={true}
      >
        <div className='d-flex flex-row bd-highlight mb-2'>
          <div
            className='d-flex flex-column bd-highlight mb-3'
            onClick={(e) => adminService.oparateParentList(e, child.length, element, parent)}
          >
            <div className='d-flex flex-row bd-highlight mb-2'>
              {child.length > 0 ? (
                <i
                  className={
                    inReloadArray
                      ? 'fs-4 p-2 bi bi-arrow-down-square'
                      : 'fs-4 p-2 bi bi-arrow-right-square'
                  }
                ></i>
              ) : (
                <div className=''></div>
              )}
              <div className='p-2 bd-highlight'>
                <h5>{props.t('categoryName')}:</h5>
              </div>
              <div className='p-2 bd-highlight'> {element.name}</div>
              <div className='p-2 bd-highlight'>
                <h5>{props.t('categoryActive')}:</h5>
              </div>
              <div className='p-2 bd-highlight'>
                {element.active ? (
                  <i className='bi bi-bookmark-check-fill'></i>
                ) : (
                  <i className='bi bi-bookmark-dash'></i>
                )}
              </div>
            </div>
            <div className='d-flex flex-row bd-highlight mb-2'>
              <div className='p-2 bd-highlight'>
                <h5>{props.t('categoryKey')}:</h5>
              </div>
              <div className='p-2 bd-highlight'> {element.categoryKey}</div>
            </div>
          </div>

          <div className='ms-5 p-2 bd-highlight align-self-center'>
            <Button
              name='en'
              variant='dark'
              size='lg'
              className='btn button'
              disabled={usedInRefCategory != 0 || usedInitialCategory}
              onClick={(e) => {
                props.categoriesId.current.push(element.id);
                props.audiobookAddCategory({
                  element: e,
                  categoryId: element.id,
                  audiobookId: props.audiobookDetail.id,
                });
              }}
            >
              {props.t('add')}
            </Button>
          </div>
        </div>
        <ul className='list-group' data-name={element.name}>
          {child}
        </ul>
      </li>
    );
  }

  function createListElement(element, parent) {
    const usedInRefCategory = props.categoriesId.current.filter((x) => x === element.id).length;
    const usedInitialCategory = props.audiobookDetail.categories.filter(
      (x) => x.id === element.id,
    ).length;
    const inReloadArray =
      parent != null && props.lastOpenedCategories.current[parent.id] !== undefined;

    let css = '';

    if (inReloadArray) {
      css = 'p-2 border list-group-item';
    } else {
      css = 'd-none p-2 border list-group-item';
    }

    return (
      <li key={uuidv4()} className={css} id={element.id}>
        <div className='d-flex flex-row bd-highlight mb-2'>
          <div className='d-flex flex-column bd-highlight mb-3'>
            <div className='d-flex flex-row bd-highlight mb-2'>
              <div className='p-2 bd-highlight'>
                <h5>{props.t('categoryName')}:</h5>
              </div>
              <div className='p-2 bd-highlight'> {element.name}</div>
              <div className='p-2 bd-highlight'>
                <h5>{props.t('categoryActive')}:</h5>
              </div>
              <div className='p-2 bd-highlight'>
                {element.active ? (
                  <i className='bi bi-bookmark-check-fill'></i>
                ) : (
                  <i className='bi bi-bookmark-dash'></i>
                )}
              </div>
            </div>
            <div className='d-flex flex-row bd-highlight mb-2'>
              <div className='p-2 bd-highlight'>
                <h5>{props.t('categoryKey')}:</h5>
              </div>
              <div className='p-2 bd-highlight'> {element.categoryKey}</div>
            </div>
          </div>

          <div className='ms-5 p-2 bd-highlight align-self-center'>
            <Button
              name='en'
              variant='dark'
              size='lg'
              className='btn button'
              disabled={usedInRefCategory != 0 || usedInitialCategory}
              onClick={(e) => {
                props.categoriesId.current.push(element.id);
                props.audiobookAddCategory({
                  element: e,
                  categoryId: element.id,
                  audiobookId: props.audiobookDetail.id,
                });
              }}
            >
              {props.t('add')}
            </Button>
          </div>
        </div>
      </li>
    );
  }

  function recursiveTree(array, renderArray, kids, parent = null) {
    let returnArray = [];

    for (const element of array) {
      let elementArray = [];
      let children = [];

      elementArray.push = element;

      if (element['children'].length != 0) {
        let returnedChildren = recursiveTree(element['children'], renderArray, kids, element);

        for (const value of returnedChildren) {
          let childElement = [createListElement(value.push, element)];

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

  return (
    <div>
      <ul className='list-group categories_add_list overflow-auto'>{createTree()}</ul>
    </div>
  );
}
