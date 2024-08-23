import React from 'react';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import UserAudiobookCategoriesService from 'Service/User/UserAudiobookCategoriesService';

export default function UserRenderCategoriesList(props) {
  const userService = new UserAudiobookCategoriesService(props);

  const createTree = () => {
    let renderArray = [];
    let kids = [];

    if (props.categories !== null) {
      recursiveTree(props.categories.categories, renderArray, kids, null);
    }

    return renderArray;
  };

  function listParent(element, child, parent) {
    const inReloadArray = props.lastOpenedCategories.current[element.categoryKey] !== undefined;
    const parentInArray =
      parent !== null && props.lastOpenedCategories.current[parent.categoryKey] !== undefined;

    return (
      <li
        key={uuidv4()}
        className={
          parent === null || inReloadArray || parentInArray
            ? 'visible list-group-item text-light'
            : 'd-none list-group-item text-light'
        }
        style={{
          backgroundColor: '#525252',
          border: '0.2rem',
          borderStyle: 'solid',
          borderColor: '#2a5740',
        }}
        data-clicable={true}
      >
        <div className='bd-highlight my-2'>
          <div
            className='d-flex row'
            onClick={(e) => userService.oparateParentList(e, child.length, element, parent)}
          >
            <div className='d-flex row bd-highlight align-items-center'>
              {child.length > 0 ? (
                <i
                  className={
                    inReloadArray
                      ? 'fs-3 bi bi-arrow-down-square col-1'
                      : 'fs-3 bi bi-arrow-right-square col-1'
                  }
                ></i>
              ) : (
                <div className=''></div>
              )}
              <div className='bd-highlight fs-4 col'> {element.name}</div>
              <div className='col'>
                <Button
                  name='en'
                  variant='dark'
                  size='lg'
                  className='btn button'
                  onClick={() => {
                    props.setReportState((prev) => ({
                      ...prev,
                      choosenCategory: element.categoryKey,
                      choosenCategoryName: element.name,
                      openCategoriesList: !props.reportState.openCategoriesList,
                    }));
                  }}
                >
                  {props.t('select')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ul className='list-group' data-name={element.name}>
          {child}
        </ul>
      </li>
    );
  }

  function createListElement(element, parent) {
    const inReloadArray =
      parent != null && props.lastOpenedCategories.current[parent.categoryKey] !== undefined;

    let css = '';

    if (inReloadArray) {
      css = 'list-group-item text-light';
    } else {
      css = 'd-none list-group-item text-light';
    }

    return (
      <li
        key={uuidv4()}
        className={css}
        id={element.categoryKey}
        style={{
          backgroundColor: '#525252',
          border: '0.2rem',
          borderStyle: 'solid',
          borderColor: '#31694c',
        }}
      >
        <div className='bd-highlight my-2'>
          <div className='d-flex row'>
            <div className='d-flex row bd-highlight align-items-center'>
              <div className='bd-highlight fs-4 col'> {element.name}</div>
              <div className='col'>
                <Button
                  name='en'
                  variant='dark'
                  size='lg'
                  className='btn button'
                  onClick={() => {
                    props.setReportState((prev) => ({
                      ...prev,
                      choosenCategory: element.categoryKey,
                      choosenCategoryName: element.name,
                      openCategoriesList: !props.reportState.openCategoriesList,
                    }));
                  }}
                >
                  {props.t('select')}
                </Button>
              </div>
            </div>
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

          if (kids[element.categoryKey] != undefined) {
            let ul = kids[element.categoryKey].filter((x) => x.type === 'li');

            if (
              !ul.some((cat) =>
                cat.props.children[1] != undefined
                  ? cat.props.children[1].props['data-name'] === value.push.name
                  : false,
              )
            ) {
              kids[element.categoryKey] = kids[element.categoryKey].concat(childElement);
            }
          } else {
            kids[element.categoryKey] = childElement;
          }

          elementArray['child'] = value;
        }

        if (Object.keys(kids).some((key) => key === element.categoryKey)) {
          for (const iterator of kids[element.categoryKey]) {
            children.push(iterator);
          }
        }

        if (element.parentCategoryKey === null || element.parentCategoryKey === '') {
          renderArray.push(listParent(element, children, parent));
        } else {
          let parentElement = [listParent(element, children, parent)];

          if (kids[parent.categoryKey] != undefined) {
            kids[parent.categoryKey] = kids[parent.categoryKey].concat(parentElement);
          } else {
            kids[parent.categoryKey] = parentElement;
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
    <div className='ms-1'>
      <ul className='list-group categories_add_list overflow-auto mx-5'>{createTree()}</ul>
    </div>
  );
}
