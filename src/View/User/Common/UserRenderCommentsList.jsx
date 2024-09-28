import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function UserRenderCommentsList(props) {
  const [commentState, setCommentState] = useState({
    parentId: null,
    commentId: null,
    comment: '',
    add: true,
    edit: false,
  });

  //todo dodaj do rozwijania komentarzy jakieś lepsze przejście
  //--------------------------------------------------------------------------------------------------------------------------------
  //Changing comments functions
  function likeComment(comment, element, bool) {
    if (comment.children.length === 0) {
      props.lastOpenComment.current = comment.parentId;
    }

    let data = {};
    if (comment.liked === bool) {
      data = {
        url: '/user/audiobook/comment/like/delete',
        method: 'DELETE',
        jsonData: {
          commentId: comment.id,
        },
      };
    } else {
      data = {
        url: '/user/audiobook/comment/like/add',
        method: 'PATCH',
        jsonData: {
          commentId: comment.id,
          like: bool,
        },
      };
    }

    data.props = props;
    data.element = element;
    data.comment = comment;
    data.bool = bool;

    element.target.classList.add('disabled');
    props.likeComment(data);
  }

  function editComment(element) {
    element.target.classList.add('disabled');
    let jsonData = {
      audiobookId: props.state.detailModalAudiobook.id,
      categoryKey: props.state.detailModalCategory.categoryKey,
      audiobookCommentId: commentState.commentId,
      comment: commentState.comment,
      deleted: false,
    };

    if (commentState.parentId != null) {
      props.lastOpenComment.current = commentState.parentId;

      jsonData.additionalData = {
        parentId: commentState.parentId,
      };
    }
    props.editComment({
      jsonData: jsonData,
      element: element,
      decline: decline,
      clearInputComment: clearInputComment,
      lastOpenComment: props.lastOpenComment.current,
    });
  }

  function addComment(element) {
    element.target.classList.add('disabled');
    let jsonData = {
      audiobookId: props.state.detailModalAudiobook.id,
      categoryKey: props.state.detailModalCategory.categoryKey,
      comment: commentState.comment,
    };

    if (commentState.parentId != null) {
      props.lastOpenComment.current = commentState.parentId;

      jsonData.additionalData = {
        parentId: commentState.parentId,
      };
    }

    props.addComment({
      jsonData: jsonData,
      element: element,
      decline: decline,
      clearInputComment: clearInputComment,
      lastOpenComment: props.lastOpenComment.current,
      setAudiobookDetailRefresh: props.setAudiobookDetailRefresh,
    });
  }
  function deleteComment(comment, element) {
    element.target.classList.add('disabled');

    let jsonData = {
      audiobookId: props.state.detailModalAudiobook.id,
      categoryKey: props.state.detailModalCategory.categoryKey,
      audiobookCommentId: comment.id,
      comment: comment.comment,
      deleted: true,
    };

    props.editComment({
      jsonData: jsonData,
      element: element,
      decline: decline,
      lastOpenComment: props.lastOpenComment.current,
      setAudiobookDetailRefresh: props.setAudiobookDetailRefresh,
    });
  }

  function reportComment(comment) {
    props.setState((prev) => ({
      ...prev,
      reportDescModal: !props.state.reportDescModal,
      reportCommentId: comment.id,
    }));
  }
  //--------------------------------------------------------------------------------------------------------------------------------
  //Small state functions
  function startEditComment(comment) {
    if (comment.parentId != null) {
      props.lastOpenComment.current = comment.parentId;
    }

    setCommentState((prev) => ({
      ...prev,
      commentId: comment.id,
      comment: comment.comment,
      edit: true,
      add: false,
    }));
  }

  function decline() {
    props.lastOpenComment.current = null;
    setCommentState((prev) => ({
      ...prev,
      parentId: null,
      commentId: null,
      comment: '',
      add: true,
      edit: false,
    }));
  }

  function clearInputComment() {
    setCommentState((prev) => ({
      ...prev,
      comment: '',
    }));
  }

  function addChildComment(comment) {
    props.lastOpenComment.current = comment.id;

    setCommentState((prev) => ({
      ...prev,
      parentId: comment.id,
      commentId: comment.id,
      comment: '',
      edit: false,
      add: true,
    }));
  }

  function textareaWrite(event) {
    setCommentState((prev) => ({
      ...prev,
      comment: event.target.value,
    }));
  }

  function showText(comment, element) {
    element.currentTarget.parentElement.innerHTML = comment;
  }

  //--------------------------------------------------------------------------------------------------------------------------------
  //Opening/Closing parent list

  const oparateParentList = (element) => {
    element.stopPropagation();
    if (element.currentTarget.attributes['data-clicable'].value === 'true') {
      openParentList(element);
    } else {
      closeParentList(element);
    }
  };

  function openParentList(element) {
    element.currentTarget.parentElement.parentElement.classList.remove('ps-3');
    element.currentTarget.parentElement.parentElement.classList.remove('comment-pill');
    element.currentTarget.parentElement.parentElement.classList.add('comments-pill');
    element.currentTarget.parentElement.parentElement.classList.add('px-2');

    let children = element.currentTarget.parentElement.parentElement.children;

    element.currentTarget.attributes['data-clicable'].value = 'false';

    for (const element of children) {
      for (const el of element.children) {
        el.classList.remove('d-none');
      }
      if (
        element.children[0].nodeName === 'DIV' &&
        element.children[0].attributes['data-clicable'] !== undefined
      ) {
        let icon = element.children[0].children[0].children[0].children[0];
        icon.classList.remove('bi-arrow-right-square');
        icon.classList.add('bi-arrow-down-square');
      }
    }
  }

  function closeParentList(element) {
    element.currentTarget.parentElement.parentElement.classList.remove('comments-pill');
    element.currentTarget.parentElement.parentElement.classList.remove('px-2');
    element.currentTarget.parentElement.parentElement.classList.add('ps-3');
    element.currentTarget.parentElement.parentElement.classList.add('comment-pill');

    let children = element.currentTarget.parentElement.parentElement.children;

    element.currentTarget.attributes['data-clicable'].value = 'true';

    for (const element of children) {
      if (element.nodeName === 'UL') {
        for (const el of element.children) {
          el.classList.add('d-none');
        }
      }
      if (
        element.children[0].nodeName === 'DIV' &&
        element.children[0].attributes['data-clicable'] !== undefined
      ) {
        let icon = element.children[0].children[0].children[0].children[0];
        icon.classList.remove('bi-arrow-down-square');
        icon.classList.add('bi-arrow-right-square');
      }
    }
  }

  //--------------------------------------------------------------------------------------------------------------------------------
  //Render
  function listParent(element, child) {
    return (
      <li
        key={uuidv4()}
        className={
          commentState.commentId === element.id
            ? element.id === props.lastOpenComment.current
              ? 'border border-6 border-warning border comment comments-pill px-2 py-1'
              : 'border border-6 border-warning border comment comment-pill ps-2 py-1'
            : element.id === props.lastOpenComment.current
            ? 'border border-6 border-secondary border comment comments-pill px-2 py-1'
            : 'border border-6 border-secondary border comment comment-pill ps-2 py-1'
        }
      >
        <div className='row p-1 bd-highlight'>
          <div
            className='col-8'
            onClick={child.length > 0 ? oparateParentList : undefined}
            data-clicable={true}
          >
            <div className='row'>
              <div className='col-1 cs'>
                {child.length > 0 ? (
                  element.id === props.lastOpenComment.current ? (
                    <i className='p-2 bi bi-arrow-down-square '></i>
                  ) : (
                    <i className='p-2 bi bi-arrow-right-square '></i>
                  )
                ) : null}
              </div>
              <div className='col-1'>
                <span className='badge bg-dark comment-pill'>{element.children.length}</span>
              </div>
              <div className='col-8 fw-bold medium-text'>{element.userModel.email}</div>
            </div>
          </div>
          <div className='col-4'>
            <div className='row justify-content-center '>
              <div className='row'>
                <div className='col-1'>
                  <span className='badge bg-dark comment-pill'>{element.audiobookCommentLike}</span>
                </div>
                <div className='col-3'>
                  <Button
                    name='en'
                    variant={element.liked === null || !element.liked ? 'dark' : 'success'}
                    size='sm'
                    className={
                      element.liked === null || !element.liked
                        ? 'btn button rounded-3 primary_button'
                        : 'btn button rounded-3 success_button'
                    }
                    onClick={(e) => {
                      likeComment(element, e, true);
                    }}
                  >
                    <i className='bi bi-hand-thumbs-up'></i>
                  </Button>
                </div>
                <div className='col-3'>
                  <Button
                    name='en'
                    variant={element.liked === null || element.liked ? 'dark' : 'danger'}
                    size='sm'
                    className={
                      element.liked === null || element.liked
                        ? 'btn button rounded-3 primary_button'
                        : 'btn button rounded-3 danger_button'
                    }
                    onClick={(e) => {
                      likeComment(element, e, false);
                    }}
                  >
                    <i className='bi bi-hand-thumbs-down'></i>
                  </Button>
                </div>
                <div className='col-1'>
                  <span className='badge bg-dark comment-pill'>
                    {element.audiobookCommentUnlike}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row mx-1 small-text my-1'>
          {element.comment.length > 20 ? (
            <div className='row'>
              <div className='col-10 text-break'>
                <div className='row'>
                  <div className='col-8'>{element.comment.slice(0, 40)}...</div>
                  <p className='col-4 show-more' onClick={(e) => showText(element.comment, e)}>
                    {props.t('showMore')}
                  </p>
                </div>
              </div>
              <div className='col-2 text-break d-flex justify-content-end'>
                <Button
                  name='en'
                  variant='danger'
                  size='sm'
                  className='btn button rounded-3 danger_button comment-button-small text-center'
                  onClick={() => {
                    reportComment(element);
                  }}
                >
                  {props.t('report')}
                </Button>
              </div>
            </div>
          ) : (
            <div className='row'>
              <div className='col-10 text-break'>{element.comment}</div>
              {!element.myComment ? (
                <div className='col-2 text-break d-flex justify-content-end'>
                  <Button
                    name='en'
                    variant='danger'
                    size='sm'
                    className='btn button rounded-3 danger_button comment-button-small text-center'
                    onClick={() => {
                      reportComment(element);
                    }}
                  >
                    {props.t('report')}
                  </Button>
                </div>
              ) : null}
            </div>
          )}
        </div>
        {element.myComment ? (
          <div className='col-5'>
            <div className='row mx-2 justify-content-start'>
              <div className='col-4'>
                <Button
                  name='en'
                  variant='secondary'
                  size='sm'
                  className='btn button rounded-3 warning_button comment-button-small'
                  disabled={commentState.edit}
                  onClick={(e) => {
                    startEditComment(element, e);
                  }}
                >
                  {props.t('edit')}
                </Button>
              </div>
              <div className='col-4'>
                <Button
                  name='en'
                  variant='danger'
                  size='sm'
                  className='btn button rounded-3 danger_button comment-button-small text-center'
                  onClick={(e) => {
                    deleteComment(element, e);
                  }}
                >
                  {props.t('delete')}
                </Button>
              </div>
              <div className='col-4'>
                <Button
                  name='en'
                  variant='success'
                  size='sm'
                  disabled={commentState.parentId != null}
                  className='btn button rounded-3 success_button comment-button-small text-center'
                  onClick={() => addChildComment(element)}
                >
                  {props.t('add')}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className='col-5 mx-3 justify-content-start'>
            <Button
              name='en'
              variant='success'
              size='sm'
              disabled={commentState.parentId != null}
              className='btn button rounded-3 success_button comment-button-small text-center'
              onClick={() => addChildComment(element)}
            >
              {props.t('add')}
            </Button>
          </div>
        )}
        {element.children.length > 0 ? (
          <ul className='list-group' data-name={element.id}>
            {child}
            <div
              className={
                props.lastOpenComment.current === element.id
                  ? 'row mt-2 justify-content-center'
                  : 'row mt-2 d-none justify-content-center'
              }
            >
              <div className='col-8 align-self-center'>
                <Button
                  name='en'
                  variant='success'
                  size='sm'
                  disabled={commentState.parentId != null}
                  className='btn button rounded-3 add-parent-comment-button mb-1 success_button'
                  onClick={() => addChildComment(element)}
                >
                  {props.t('add')}
                </Button>
              </div>
            </div>
          </ul>
        ) : null}
      </li>
    );
  }

  function createListElement(element) {
    return (
      <li
        key={uuidv4()}
        className={
          props.lastOpenComment.current === element.parentId
            ? commentState.commentId === element.id
              ? 'px-2 py-1 my-1 comment-pill border border-warning'
              : 'px-2 py-1 my-1 border comment-pill'
            : 'd-none px-2 py-1 my-1 border comment-pill'
        }
        id={element.id}
      >
        <div className='row p-1 bd-highlight'>
          <div className='col-8 fw-bold medium-text'>{element.userModel.email}</div>
          <div className='col-4'>
            <div className='row justify-content-center '>
              <div className='row'>
                <div className='col-1'>
                  <span className='badge bg-dark comment-pill'>{element.audiobookCommentLike}</span>
                </div>
                <div className='col-3'>
                  <Button
                    name='en'
                    variant={element.liked === null || !element.liked ? 'dark' : 'success'}
                    size='sm'
                    className={
                      element.liked === null || !element.liked
                        ? 'btn button rounded-3 primary_button'
                        : 'btn button rounded-3 success_button'
                    }
                    onClick={(e) => {
                      likeComment(element, e, true);
                    }}
                  >
                    <i className='bi bi-hand-thumbs-up'></i>
                  </Button>
                </div>
                <div className='col-3'>
                  <Button
                    name='en'
                    variant={element.liked === null || element.liked ? 'dark' : 'danger'}
                    size='sm'
                    className={
                      element.liked === null || element.liked
                        ? 'btn button rounded-3 primary_button'
                        : 'btn button rounded-3 danger_button'
                    }
                    onClick={(e) => {
                      likeComment(element, e, false);
                    }}
                  >
                    <i className='bi bi-hand-thumbs-down'></i>
                  </Button>
                </div>
                <div className='col-1'>
                  <span className='badge bg-dark comment-pill'>
                    {element.audiobookCommentUnlike}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row mx-2 small-text my-1'>
          {element.comment.length > 20 ? (
            <div className='row'>
              <div className='col-10 text-break'>
                <div className='row'>
                  <div className='col-8'>{element.comment.slice(0, 40)}</div>
                  <p className='col-4 show-more' onClick={(e) => showText(element.comment, e)}>
                    {props.t('showMore')}
                  </p>
                </div>
              </div>
              <div className='col-2 text-break d-flex justify-content-end'>
                <Button
                  name='en'
                  variant='danger'
                  size='sm'
                  className='btn button rounded-3 danger_button comment-button-small text-center'
                  onClick={() => {
                    reportComment(element);
                  }}
                >
                  {props.t('report')}
                </Button>
              </div>
            </div>
          ) : (
            <div className='row'>
              <div className='col-10 text-break'>{element.comment}</div>
              {!element.myComment ? (
                <div className='col-2 text-break d-flex justify-content-end'>
                  <Button
                    name='en'
                    variant='danger'
                    size='sm'
                    className='btn button rounded-3 danger_button comment-button-small text-center'
                    onClick={() => {
                      reportComment(element);
                    }}
                  >
                    {props.t('report')}
                  </Button>
                </div>
              ) : null}
            </div>
          )}
        </div>
        {element.myComment ? (
          <div className='col-7'>
            <div className='row mx-1 justify-content-start'>
              <div className='col-3'>
                <Button
                  name='en'
                  variant='secondary'
                  size='sm'
                  className='btn button rounded-3 warning_button comment-button-small text-center'
                  disabled={commentState.edit}
                  onClick={(e) => {
                    startEditComment(element, e);
                  }}
                >
                  {props.t('edit')}
                </Button>
              </div>
              <div className='col-3'>
                <Button
                  name='en'
                  variant='danger'
                  size='sm'
                  className='btn button rounded-3 danger_button comment-button-small text-center'
                  onClick={(e) => {
                    deleteComment(element, e);
                  }}
                >
                  {props.t('delete')}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </li>
    );
  }

  function createTree(array, renderArray) {
    for (const element of array) {
      let children = [];

      if (element['children'].length !== 0) {
        children.push(
          <hr
            key={uuidv4()}
            className={element.id === props.lastOpenComment.current ? null : 'd-none'}
          ></hr>,
        );
        for (const child of element['children']) {
          children.push(createListElement(child));
        }
      }
      renderArray.push(listParent(element, children));
    }
  }

  const renderTree = () => {
    let renderArray = [];

    createTree(props.comments, renderArray);

    return renderArray;
  };

  return (
    <div className='row'>
      {props.comments !== undefined && props.comments !== null && props.comments.length > 0 ? (
        <ul className='comments-height overflow-auto '>{renderTree()}</ul>
      ) : null}
      <div className='row mt-2 justify-content-center align-items-center'>
        <div className='col-8'>
          <InputGroup>
            <InputGroup.Text
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderColor: '#3C3C3C',
                color: 'white',
              }}
            >
              {props.t('comment')}
            </InputGroup.Text>
            <Form.Control
              onChange={(e) => textareaWrite(e)}
              value={commentState.comment}
              as='textarea'
              aria-label='With textarea'
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderColor: '#3C3C3C',
                color: 'white',
                fontSize: '0.9rem',
              }}
            />
          </InputGroup>
        </div>
        <div className='col-2 align-self-center'>
          <Button
            name='en'
            variant='secondary'
            size='sm'
            className='btn button rounded-3 comment-button warning_button float-right'
            disabled={
              (props.audiobookDetail !== undefined &&
                props.audiobookDetail !== null &&
                !props.audiobookDetail.canComment) ||
              (commentState.comment.length <= 0 &&
              (commentState.add || commentState.edit) &&
              commentState.commentId != null
                ? false
                : commentState.comment.length <= 0)
            }
            onClick={() => decline()}
          >
            {props.t('cancel')}
          </Button>
        </div>
        <div className='col-2 align-self-center'>
          <Button
            name='en'
            variant='secondary'
            size='sm'
            className='btn button rounded-3 comment-button primary_button'
            disabled={
              (props.audiobookDetail !== null && !props.audiobookDetail.canComment) ||
              commentState.comment.length === 0
            }
            onClick={
              commentState.add
                ? (e) => {
                    addComment(e);
                  }
                : commentState.edit
                ? (e) => {
                    editComment(e);
                  }
                : undefined
            }
          >
            {commentState.add ? props.t('add') : commentState.edit ? props.t('edit') : null}
          </Button>
        </div>
      </div>
    </div>
  );
}
