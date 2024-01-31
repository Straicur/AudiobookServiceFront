import { HandleFetch } from 'Util/HandleFetch';
import React from 'react';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default class AdminAudiobookRenderCategoriesService {
  constructor(props) {
    this.props = props;
  }

  addCategory = (element, category) => {
    element.stopPropagation();
    HandleFetch(
      '/admin/category/add/audiobook',
      'PUT',
      {
        categoryId: category.id,
        audiobookId: this.props.audiobookDetail.id,
      },
      this.props.token,
      this.props.i18n.language,
    )
      .then(() => {
        element.target.disabled = true;
      })
      .catch((e) => {
        this.props.setAudiobookState({
          ...this.props.audiobookState,
          error: e,
        });
      });
  };

  oparateParentList = (element) => {
    element.stopPropagation();
    if (element.currentTarget.attributes['data-clicable'].value == 'true') {
      this.openParentList(element);
    } else {
      this.closeParentList(element);
    }
  };

  openParentList(element) {
    let children = element.currentTarget.children;

    element.currentTarget.attributes['data-clicable'].value = 'false';

    for (const element of children) {
      if (element.nodeName == 'UL') {
        for (const el of element.children) {
          el.classList.remove('d-none');
        }
      }
      if (element.nodeName == 'DIV') {
        const divfirst = element.children[0];
        const divsecond = divfirst.children[0];

        for (const el of divsecond.children) {
          if (el.nodeName == 'I') {
            el.classList.remove('bi-arrow-right-square');
            el.classList.add('bi-arrow-down-square');
          }
        }
      }
    }
  }

  closeParentList(element) {
    let children = element.currentTarget.children;

    element.currentTarget.attributes['data-clicable'].value = 'true';

    for (const element of children) {
      if (element.nodeName == 'UL') {
        for (const el of element.children) {
          el.classList.add('d-none');
        }
      }
      if (element.nodeName == 'DIV') {
        const divfirst = element.children[0];
        const divsecond = divfirst.children[0];

        for (const el of divsecond.children) {
          if (el.nodeName == 'I') {
            el.classList.remove('bi-arrow-down-square');
            el.classList.add('bi-arrow-right-square');
          }
        }
      }
    }
  }

  listParent(element, child, parent) {
    const usedCategory = this.props.categoriesState.categoriesId.filter(
      (x) => x == element.id,
    ).length;

    return (
      <li
        key={this.uuidv4()}
        className={
          parent == null
            ? 'visible border border-4 border-secondary list-group-item'
            : 'd-none border list-group-item'
        }
        onClick={child.length > 0 ? this.oparateParentList : undefined}
        data-clicable={true}
      >
        <div className='d-flex flex-row bd-highlight mb-2'>
          <div className='d-flex flex-column bd-highlight mb-3'>
            <div className='d-flex flex-row bd-highlight mb-2'>
              {child.length > 0 ? (
                <i className='p-2 bi bi-arrow-right-square '></i>
              ) : (
                <div className=''></div>
              )}
              <div className='p-2 bd-highlight'>
                <h5>{this.props.t('categoryName')}:</h5>
              </div>
              <div className='p-2 bd-highlight'> {element.name}</div>
              <div className='p-2 bd-highlight'>
                <h5>{this.props.t('categoryActive')}:</h5>
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
                <h5>{this.props.t('categoryKey')}:</h5>
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
              disabled={usedCategory != 0}
              onClick={(e) => this.addCategory(e, element)}
            >
              {this.props.t('add')}
            </Button>
          </div>
        </div>
        <ul className='list-group' data-name={element.name}>
          {child}
        </ul>
      </li>
    );
  }

  createListElement(element) {
    const usedCategory = this.props.categoriesState.categoriesId.filter(
      (x) => x == element.id,
    ).length;
    return (
      <li key={uuidv4()} className='d-none p-2 border list-group-item' id={element.id}>
        <div className='d-flex flex-row bd-highlight mb-2'>
          <div className='d-flex flex-column bd-highlight mb-3'>
            <div className='d-flex flex-row bd-highlight mb-2'>
              <div className='p-2 bd-highlight'>
                <h5>{this.props.t('categoryName')}:</h5>
              </div>
              <div className='p-2 bd-highlight'> {element.name}</div>
              <div className='p-2 bd-highlight'>
                <h5>{this.props.t('categoryActive')}:</h5>
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
                <h5>{this.props.t('categoryKey')}:</h5>
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
              disabled={usedCategory != 0}
              onClick={(e) => this.addCategory(e, element)}
            >
              {this.props.t('add')}
            </Button>
          </div>
        </div>
      </li>
    );
  }

  recursiveTree(array, renderArray, kids, parent = null) {
    let returnArray = [];

    for (const element of array) {
      let elementArray = [];
      let children = [];

      elementArray.push = element;

      if (element['children'].length != 0) {
        let returnedChildren = this.recursiveTree(element['children'], renderArray, kids, element);

        for (const value of returnedChildren) {
          let childElement = [this.createListElement(value.push)];

          if (kids[element.id] != undefined) {
            let ul = kids[element.id].filter((x) => x.type == 'li');

            if (
              !ul.some((cat) =>
                cat.props.children[1] != undefined
                  ? cat.props.children[1].props['data-name'] == value.push.name
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

        if (Object.keys(kids).some((key) => key == element.id)) {
          for (const iterator of kids[element.id]) {
            children.push(iterator);
          }
        }

        if (element.parentCategoryKey == null) {
          renderArray.push(this.listParent(element, children, parent));
        } else {
          let parentElement = [this.listParent(element, children, parent)];

          if (kids[parent.id] != undefined) {
            kids[parent.id] = kids[parent.id].concat(parentElement);
          } else {
            kids[parent.id] = parentElement;
          }
        }
      } else {
        if (element.parentCategoryKey == null) {
          renderArray.push(this.listParent(element, children, parent));
        }
      }
      returnArray.push(elementArray);
    }
    return returnArray;
  }
}
