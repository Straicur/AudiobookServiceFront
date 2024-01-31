import React from 'react';
import { HandleFetch } from 'Util/HandleFetch';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'react-bootstrap';

export default class AdminAudiobookRenderCommentsService {
  constructor(props) {
    this.props = props;
  }

  deleteCommnet(element) {
    HandleFetch(
      '/admin/audiobook/comment/delete',
      'DELETE',
      {
        audiobookCommentId: element.id,
      },
      this.props.token,
      this.props.i18n.language,
    )
      .then(() => {
        this.props.setAudiobookCommnetsRefetchState(true);
      })
      .catch((e) => {
        this.props.setAudiobookState({
          ...this.props.audiobookState,
          error: e,
        });
      });
  }

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
        element.children[0].children[0].classList.remove('bi-arrow-right-square');
        element.children[0].children[0].classList.add('bi-arrow-down-square');
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
        element.children[0].children[0].classList.remove('bi-arrow-down-square');
        element.children[0].children[0].classList.add('bi-arrow-right-square');
      }
    }
  }

  listParent(element, child) {
    return (
      <li
        key={uuidv4()}
        className='border border-1 border-dark list-group-item'
        onClick={child.length > 0 ? this.oparateParentList : undefined}
        data-clicable={true}
      >
        <div className='row p-1 bd-highlight comment_detail_height'>
          <div className='col-1'>
            {child.length > 0 ? <i className='p-2 bi bi-arrow-right-square '></i> : null}
          </div>
          <div className='col-1 fw-bold'>{this.props.t('comment')}:</div>
          <div className='col-4 overflow-auto text-break comment_detail_height_comment'>
            {element.comment}
          </div>
          <div className='col-1 fw-bold'>{this.props.t('owner')}:</div>
          <div className='col-3'>{element.userModel.email}</div>
          <div className='col-1'>
            {element.deleted ? (
              <i className='bi bi-bookmark-dash'></i>
            ) : (
              <i className='bi bi-bookmark-check-fill'></i>
            )}
          </div>
          <div className='col-1'>
            <Button
              name='en'
              variant='dark'
              size='sm'
              className='btn button'
              onClick={() => {
                this.deleteCommnet(element);
              }}
            >
              {element.deleted ? this.props.t('restore') : this.props.t('delete')}
            </Button>
          </div>
        </div>
        <ul className='list-group' data-name={element.id}>
          {child}
        </ul>
      </li>
    );
  }

  createListElement(index, element, arrayLength) {
    return (
      <li
        key={uuidv4()}
        className={
          arrayLength == 1
            ? 'd-none p-2 border border-1 border-secondary list-group-item'
            : index + 1 == arrayLength
            ? 'd-none p-2 border border-1 border-secondary list-group-item'
            : 'd-none p-2 border border-1 border-bottom-0 border-secondary list-group-item'
        }
        id={element.id}
      >
        <div className='row p-1 bd-highlight comment_detail_height'>
          <div className='col-1 fw-bold'>{this.props.t('comment')}:</div>
          <div className='col-5 overflow-auto text-break comment_detail_height_comment'>
            {element.comment}
          </div>
          <div className='col-1 fw-bold'>{this.props.t('owner')}:</div>
          <div className='col-3'>{element.userModel.email}</div>
          <div className='col-1'>
            {element.deleted ? (
              <i className='bi bi-bookmark-dash'></i>
            ) : (
              <i className='bi bi-bookmark-check-fill'></i>
            )}
          </div>
          <div className='col-1'>
            <Button
              name='en'
              variant='dark'
              size='sm'
              className='btn button'
              onClick={() => {
                this.deleteCommnet(element);
              }}
            >
              {element.deleted ? this.props.t('restore') : this.props.t('delete')}
            </Button>
          </div>
        </div>
      </li>
    );
  }

  createTree(array, renderArray) {
    for (const element of array) {
      let children = [];

      if (element['children'].length != 0) {
        for (const [index, child] of element['children'].entries()) {
          children.push(this.createListElement(index, child, element['children'].length));
        }
      }
      renderArray.push(this.listParent(element, children));
    }
  }
}
