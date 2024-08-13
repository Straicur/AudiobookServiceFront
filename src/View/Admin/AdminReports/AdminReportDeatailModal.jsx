import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CreateUtil from 'Util/CreateUtil';
import Accordion from 'react-bootstrap/Accordion';
import { v4 as uuidv4 } from 'uuid';

export default function AdminReportDeatailModal(props) {
  const [actionState, setActionState] = useState({
    banPeriod: null,
    answer: '',
  });

  const createReportType = (element) => {
    switch (element) {
      case 1: {
        return props.t('reportTypeComment');
      }
      case 2: {
        return props.t('reportTypeAudiobook');
      }
      case 3: {
        return props.t('reportTypeCategory');
      }
      case 4: {
        return props.t('reportTypeSystem');
      }
      case 5: {
        return props.t('reportTypeUser');
      }
      case 6: {
        return props.t('reportTypeSettings');
      }
      case 7: {
        return props.t('reportTypeRecruitment');
      }
      case 8: {
        return props.t('reportTypeOther');
      }
    }
  };

  const createBanType = (element) => {
    switch (element) {
      case 1: {
        return props.t('banTypeSpam');
      }
      case 2: {
        return props.t('banTypeComment');
      }
      case 3: {
        return props.t('banTypeStrangeBehavior');
      }
    }
  };

  const handleClose = () => {
    props.setReportState((prev) => ({
      ...prev,
      detailReportModal: !props.reportState.detailReportModal,
    }));

    props.setReportsState((prev) => ({
      ...prev,
      refresh: true,
    }));
  };

  const createCheildrenComments = (parent, comments) => {
    let renderArray = [];
    console.log(parent);
    if (comments != null) {
      comments.forEach((element) => {
        renderArray.push(
          <li
            key={uuidv4()}
            className={
              element.reportedComment
                ? 'border border-2 border-danger px-4 py-2 rounded mt-1'
                : 'border border-2 border-secondary px-4 py-2 rounded mt-1'
            }
          >
            {element.reportedComment ? (
              <div className='row fw-bold text-danger'>Zreportowany</div>
            ) : null}
            <div className='row'>
              <div className='col-2'>{props.t('email')}:</div>
              <div className='col'>{element.userModel.email}</div>
            </div>
            <div className='row'>
              <div className='col-2'>{props.t('name')}:</div>
              <div className='col'>{element.userModel.name}</div>
            </div>
            <div className='row'>
              <div className='col-2'>{props.t('deleted')}:</div>
              <div className='col'>
                {element.deleted ? (
                  <i className='bi bi-bookmark-check-fill'></i>
                ) : (
                  <i className='bi bi-bookmark-dash'></i>
                )}
              </div>
            </div>
            <div className='row'>
              <div className='col-2'>{props.t('comment')}:</div>
              <div className='col'>{element.comment}</div>
            </div>
          </li>,
        );
      });
    }

    return (
      <li
        className={
          parent.reportedComment
            ? 'border border-2 border-danger px-4 pt-2 rounded'
            : 'border border-2 border-dark px-4 pt-2 rounded'
        }
      >
        {parent.reportedComment ? (
          <div className='row fw-bold text-danger'>Zreportowany</div>
        ) : null}
        <div className='row'>
          <div className='col-2'>{props.t('email')}:</div>
          <div className='col'>{parent.userModel.email}</div>
        </div>
        <div className='row'>
          <div className='col-2'>{props.t('name')}:</div>
          <div className='col'>{parent.userModel.name}</div>
        </div>
        <div className='row'>
          <div className='col-2'>{props.t('deleted')}:</div>
          <div className='col'>
            {parent.deleted ? (
              <i className='bi bi-bookmark-check-fill'></i>
            ) : (
              <i className='bi bi-bookmark-dash'></i>
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col-2'>{props.t('comment')}:</div>
          <div className='col'>{parent.comment}</div>
        </div>
        <div className='row fw-bold mt-1'>Dzieci:</div>
        <ul>{renderArray}</ul>
      </li>
    );
  };

  return (
    <Modal
      size='lg'
      show={props.reportState.detailReportModal}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>{props.t('reportDetail')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
          <div className='row'>
            <div className='col-7'>
              <div className='row'>
                <div className='col-1 fw-bold'>{props.t('id')}:</div>
                <div className='col'> {props.reportState.id}</div>
              </div>
              <div className='row'>
                {' '}
                <div className='col-2 fw-bold'>{props.t('email')}:</div>
                <div className='col'> {props.reportState.email}</div>
              </div>
              <div className='row'>
                <div className='col-3 fw-bold'>{props.t('actionId')}:</div>
                <div className='col'> {props.reportState.actionId}</div>
              </div>
              <div className='row'>
                <div className='col-2 fw-bold'>{props.t('description')}:</div>
                <div className='col'> {props.reportState.description}</div>
              </div>
              <div className='row'>
                <div className='col-4 fw-bold'>{props.t('dateAdd')}:</div>
                <div className='col'> {CreateUtil.createDateTime(props.reportState.dateAdd)}</div>
              </div>
            </div>
            <div className='col'>
              <div className='row'>
                <div className='col-2 fw-bold'>{props.t('type')}:</div>
                <div className='col-2'>{createReportType(props.reportState.type)}</div>
              </div>

              <div className='row'>
                <div className='col-5 fw-bold'>{props.t('accepted')}:</div>
                <div className='col-2'>
                  {props.reportState.accepted ? (
                    <i className='bi bi-bookmark-check-fill'></i>
                  ) : (
                    <i className='bi bi-bookmark-dash'></i>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className='col-4 fw-bold'>{props.t('denied')}:</div>
                <div className='col-2'>
                  {props.reportState.denied ? (
                    <i className='bi bi-bookmark-check-fill'></i>
                  ) : (
                    <i className='bi bi-bookmark-dash'></i>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className='col-7 fw-bold'>{props.t('systemUser')}:</div>
                <div className='col-2'>
                  {props.reportState.user ? (
                    <i className='bi bi-bookmark-check-fill'></i>
                  ) : (
                    <i className='bi bi-bookmark-dash'></i>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className='col-1 fw-bold'>{props.t('ip')}:</div>
                <div className='col'> {props.reportState.ip}</div>
              </div>
            </div>
            <div className='row mt-3'>
              <hr />
              <div className='col-4 fw-bold fs-5 mb-1'>Detale użytkownika: </div>
              <div className='col-3'>
                {props.reportState.user === null ? 'Nie jest w systemie' : null}
              </div>
              <div className='row'>
                {props.reportState.user !== null ? (
                  <div className='row'>
                    <div className='col'>
                      <div className='row'>
                        <div className='col-4 fw-bold'>{props.t('active')}:</div>
                        <div className='col'>
                          {' '}
                          {props.reportState.user.active ? (
                            <i className='bi bi-bookmark-check-fill'></i>
                          ) : (
                            <i className='bi bi-bookmark-dash'></i>
                          )}
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-4 fw-bold'>{props.t('banned')}:</div>
                        <div className='col'>
                          {props.reportState.user.banned ? (
                            <i className='bi bi-bookmark-check-fill'></i>
                          ) : (
                            <i className='bi bi-bookmark-dash'></i>
                          )}
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-4 fw-bold'>{props.t('email')}:</div>
                        <div className='col'>{props.reportState.user.email}</div>
                      </div>
                    </div>
                    <div className='col-7'>
                      <div className='row'>
                        <div className='col-3 fw-bold'>{props.t('firstname')}:</div>
                        <div className='col'>{props.reportState.user.firstname}</div>
                      </div>
                      <div className='row'>
                        <div className='col-3 fw-bold'>{props.t('lastname')}:</div>
                        <div className='col'>{props.reportState.user.lastname}</div>
                      </div>
                      <div className='row'>
                        <div className='col-1 fw-bold'>{props.t('id')}:</div>
                        <div className='col'>{props.reportState.user.id}</div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {props.reportState.userBan !== null ? (
              <div className='row mt-2'>
                <hr />
                <div className='row fw-bold fs-5'>Użytkowni został zbanowany:</div>
                <div className='col'>
                  <div className='col-4 fw-bold'>{props.t('dateFrom')}:</div>
                  <div className='col'>{props.reportState.user.dateFrom}</div>
                </div>
                <div className='col'>
                  <div className='col-4 fw-bold'>{props.t('dateTo')}:</div>
                  <div className='col'>{props.reportState.user.dateTo}</div>
                </div>
                <div className='col'>
                  <div className='col-4 fw-bold'>{props.t('type')}:</div>
                  <div className='col'>{createBanType(props.reportState.user.type)}</div>
                </div>
              </div>
            ) : null}
            {props.reportState.comment !== null ? (
              <div className='row mt-2'>
                <hr />
                <div className='row fw-bold fs-5'></div>
                <Accordion>
                  <Accordion.Item eventKey='0'>
                    <Accordion.Header>Wyświetl komentarz:</Accordion.Header>
                    <Accordion.Body>
                      {props.reportState.comment.parentId === null &&
                      props.reportState.comment.reportedComment === true
                        ? props.reportState.comment.comment
                        : createCheildrenComments(
                            props.reportState.comment,
                            props.reportState.comment.children,
                          )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            ) : null}
            <InputGroup className='my-3 input_modal'>
              <InputGroup.Text>{props.t('answer')}</InputGroup.Text>
              <Form.Control
                as='textarea'
                name='answer'
                aria-label='With textarea'
                value={
                  props.reportState.accepted || props.reportState.denied
                    ? props.reportState.answer === null
                      ? ''
                      : props.reportState.answer
                    : actionState.answer
                }
                disabled={props.reportState.accepted || props.reportState.denied}
                onChange={(e) => {
                  setActionState((prev) => ({
                    ...prev,
                    answer: e.target.value,
                  }));
                }}
              />
            </InputGroup>
          </div>
          <div className='row justify-content-center mx-5 mt-2'>
            <div className='col-4'>
              <Button
                name='en'
                variant='success'
                size='sm'
                className='btn button p-2 px-5 fs-6'
                disabled={props.reportState.accepted || props.reportState.denied}
                onClick={() => {
                  // {
                  //   banPeriod: banPeriod,
                  // },
                  //TODO tu potrzeba logiki związanej z banami i odpowiedziami
                  let json = {
                    reportId: props.reportState.id,
                    answer: actionState.answer,
                  };

                  props.acceptReport({
                    json: json,
                  }),
                    handleClose();
                }}
              >
                {props.t('accept')}
              </Button>
            </div>
            <div className='col-4'>
              <Button
                name='en'
                variant='danger'
                size='sm'
                className='btn button p-2 px-5 fs-6'
                disabled={props.reportState.accepted || props.reportState.denied}
                onClick={() => {
                  console.log('dsa');
                  props.rejectReport({
                    reportId: props.reportState.id,
                    answer: actionState.answer,
                  });
                  handleClose();
                }}
              >
                {props.t('reject')}
              </Button>
            </div>
            <div className='col-4'>
              <Button
                name='en'
                variant='dark'
                size='sm'
                className='btn button p-2 px-5 fs-6'
                onClick={() => {
                  handleClose();
                }}
              >
                {props.t('close')}
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
