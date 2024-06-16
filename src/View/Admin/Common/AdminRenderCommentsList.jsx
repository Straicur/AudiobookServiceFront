import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';

export default function AdminRenderCommentsList(props) {
  const lastOpenComment = useRef(null);

  const renderTree = () => {
    let renderArray = [];

    if (props.comments != undefined) {
      createTree(props.comments.comments, renderArray);
    }

    if (props.comments != null && props.comments.comments.length == 0) {
      renderArray.push(
        <div key={uuidv4()} className='row text-center text-light'>
          <div className='col-md-6 offset-md-3 '>
            <h3>{props.t('empty')}</h3>
          </div>
        </div>,
      );
    }

    return renderArray;
  };

  const oparateParentList = (element, comment, child) => {
    if (child.length > 0) {
      lastOpenComment.current = comment.id;
      element.stopPropagation();
      if (element.currentTarget.attributes['data-clicable'].value == 'true') {
        openParentList(element);
      } else {
        closeParentList(element);
      }
    }
  };

  function openParentList(element) {
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

  function closeParentList(element) {
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

  function listParent(element, child) {
    return (
      <li
        key={uuidv4()}
        className='border border-1 border-dark list-group-item'
        onClick={(e) => oparateParentList(e, element, child)}
        data-clicable={element.id === lastOpenComment.current ? false : true}
      >
        <div className='row p-1 bd-highlight comment_list_height'>
          {child.length > 0 ? (
            element.id === lastOpenComment.current ? (
              <div className='col-1'>
                <i className='p-2 bi bi-arrow-down-square '></i>
              </div>
            ) : (
              <div className='col-1'>
                <i className='p-2 bi bi-arrow-right-square '></i>
              </div>
            )
          ) : null}

          <div className='col-2 fw-bold'>{props.t('owner')}:</div>
          <div className='col-5'>{element.userModel.email}</div>
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
          <div className='col-4 fw-bold'>{props.t('comment')}:</div>
          <div className='col-8 overflow-auto text-break comment_height'>{element.comment}</div>
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
          arrayLength == 1
            ? element.parentId === lastOpenComment.current
              ? 'p-2 border border-1 border-secondary list-group-item'
              : 'd-none p-2 border border-1 border-secondary list-group-item'
            : index + 1 == arrayLength
            ? element.parentId === lastOpenComment.current
              ? 'p-2 border border-1 border-secondary list-group-item'
              : 'd-none p-2 border border-1 border-secondary list-group-item'
            : element.parentId === lastOpenComment.current
            ? 'p-2 border border-1 border-bottom-0 border-secondary list-group-item'
            : 'd-none p-2 border border-1 border-bottom-0 border-secondary list-group-item'
        }
        id={element.id}
      >
        <div className='row p-1 bd-highlight comment_list_height'>
          <div className='col-2 fw-bold'>{props.t('owner')}:</div>
          <div className='col-5'>{element.userModel.email}</div>
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
          <div className='col-4 fw-bold'>{props.t('comment')}:</div>
          <div className='col-8 overflow-auto text-break comment_height'>{element.comment}</div>
        </div>
      </li>
    );
  }

  function createTree(array, renderArray) {
    for (const element of array) {
      let children = [];

      if (element['children'].length != 0) {
        for (const [index, child] of element['children'].entries()) {
          children.push(createListElement(index, child, element['children'].length));
        }
      }
      renderArray.push(listParent(element, children));
    }
  }

  return (
    <div>
      <ul className='list-group comment_delete_list overflow-auto'>{renderTree()}</ul>
    </div>
  );
}
