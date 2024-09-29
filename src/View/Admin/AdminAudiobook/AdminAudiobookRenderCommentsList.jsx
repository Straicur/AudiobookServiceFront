import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'react-bootstrap';

export default function AdminAudiobookRenderCommentsList(props) {
  const lastOpenComment = useRef(null);

  const oparateParentList = (element, comment, child) => {
    if (child.length > 0) {
      element.stopPropagation();
      lastOpenComment.current = comment.id;

      if (element.currentTarget.attributes['data-clicable'].value === 'true') {
        openParentList(element);
      } else {
        closeParentList(element);
      }
    }
  };

  const openParentList = (element) => {
    let children = element.currentTarget.children;

    element.currentTarget.attributes['data-clicable'].value = 'false';

    for (const element of children) {
      if (element.nodeName === 'UL') {
        for (const el of element.children) {
          el.classList.remove('d-none');
        }
      }
      if (element.nodeName === 'DIV') {
        element.children[0].children[0].classList.remove('bi-arrow-right-square');
        element.children[0].children[0].classList.add('bi-arrow-down-square');
      }
    }
  };

  const closeParentList = (element) => {
    let children = element.currentTarget.children;

    element.currentTarget.attributes['data-clicable'].value = 'true';

    for (const element of children) {
      if (element.nodeName === 'UL') {
        for (const el of element.children) {
          el.classList.add('d-none');
        }
      }
      if (element.nodeName === 'DIV') {
        element.children[0].children[0].classList.remove('bi-arrow-down-square');
        element.children[0].children[0].classList.add('bi-arrow-right-square');
      }
    }
  };

  const renderTree = () => {
    let renderArray = [];

    if (props.audiobookComments !== undefined) {
      createTree(props.audiobookComments.comments, renderArray);
    }

    if (props.audiobookComments != null && props.audiobookComments.comments.length === 0) {
      renderArray.push(
        <div key={uuidv4()} className='row text-center'>
          <div className='col-md-6 offset-md-3 '>
            <h3>{props.t('empty')}</h3>
          </div>
        </div>,
      );
    }

    return renderArray;
  };

  function listParent(element, child) {
    return (
      <li
        key={uuidv4()}
        className='border border-1 border-dark list-group-item'
        onClick={(e) => oparateParentList(e, element, child)}
        data-clicable={element.id !== lastOpenComment.current}
      >
        <div className='row p-1 bd-highlight comment_detail_height'>
          <div className='col-1'>
            {child.length > 0 ? (
              element.id === lastOpenComment.current ? (
                <i className='p-2 bi bi-arrow-down-square '></i>
              ) : (
                <i className='p-2 bi bi-arrow-right-square '></i>
              )
            ) : null}
          </div>
          <div className='col-1 fw-bold'>{props.t('comment')}:</div>
          <div className='col-4 overflow-auto text-break comment_detail_height_comment'>
            {element.comment}
          </div>
          <div className='col-1 fw-bold'>{props.t('owner')}:</div>
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
                props.deleteComment({
                  id: element.id,
                });
              }}
            >
              {element.deleted ? props.t('restore') : props.t('delete')}
            </Button>
          </div>
        </div>
        <ul className='list-group' data-name={element.id}>
          {child}
        </ul>
      </li>
    );
  }

  function createListElement(index, element, arrayLength) {
    return (
      <li
        key={uuidv4()}
        className={
          arrayLength === 1
            ? element.parentId === lastOpenComment.current
              ? 'p-2 border border-1 border-secondary list-group-item'
              : 'd-none p-2 border border-1 border-secondary list-group-item'
            : index + 1 === arrayLength
              ? element.parentId === lastOpenComment.current
                ? 'p-2 border border-1 border-secondary list-group-item'
                : 'd-none p-2 border border-1 border-secondary list-group-item'
              : element.parentId === lastOpenComment.current
                ? 'p-2 border border-1 border-bottom-0 border-secondary list-group-item'
                : 'd-none p-2 border border-1 border-bottom-0 border-secondary list-group-item'
        }
        id={element.id}
      >
        <div className='row p-1 bd-highlight comment_detail_height'>
          <div className='col-1 fw-bold'>{props.t('comment')}:</div>
          <div className='col-5 overflow-auto text-break comment_detail_height_comment'>
            {element.comment}
          </div>
          <div className='col-1 fw-bold'>{props.t('owner')}:</div>
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
                props.deleteComment({
                  id: element.id,
                });
              }}
            >
              {element.deleted ? props.t('restore') : props.t('delete')}
            </Button>
          </div>
        </div>
      </li>
    );
  }

  function createTree(array, renderArray) {
    for (const element of array) {
      let children = [];

      if (element['children'].length !== 0) {
        for (const [index, child] of element['children'].entries()) {
          children.push(createListElement(index, child, element['children'].length));
        }
      }
      renderArray.push(listParent(element, children));
    }
  }

  return (
    <div>
      <ul className='list-group'>{renderTree()}</ul>
    </div>
  );
}
