import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import FormService from '../../../Service/Common/FormService';
import CreateUtil from '../../../Util/CreateUtil';

export default function UserSettingsChangeParentalControlModal(props) {
  const [parentalControlSure, setParentalControlSure] = useState(false);
  const [deleteParentalControlSure, setDeleteParentalControlSure] = useState(false);
  const [state, setState] = useState({
    code: '',
    codeReturned: '',
    birthdayDate: '',
  });

  const userService = new FormService(setState);

  const handleClose = () => {
    props.setState((prev) => ({
      ...prev,
      buttonUserParentalControl: !props.state.buttonUserParentalControl,
    }));
  };

  useEffect(() => {
    if (null !== props.userDetail.birthday) {
      setState((prev) => ({
        ...prev,
        birthdayDate: CreateUtil.createDate(props.userDetail.birthday),
      }));
    }
  }, [props]);

  return (
    <Modal
      size='lg'
      show={props.state.buttonUserParentalControl}
      onHide={handleClose}
      backdrop='static'
      centered
    >
      <Modal.Body className='user-settings-modal-black-background'>
        <div className='text-white my-5'>
          <p className='fs-3 text-center'>{props.t('changeParentalControlMessage')}</p>
          <div className='row align-items-center row justify-content-center'>
            {parentalControlSure ? (
              <div className='row align-items-center text-center row justify-content-center'>
                <Form>
                  <Form.Group className='mb-3 text-center mx-5'>
                    <Form.Label className='fs-3'>{props.t('insertSmsCode')}</Form.Label>
                    <Form.Control
                      name='code'
                      value={state.code === undefined || state.code.length <= 0 ? '' : state.code}
                      onChange={(event) => userService.handleChange(event)}
                    />
                    <Alert
                      show={state.code !== state.codeReturned}
                      className='dangerAllert mt-1 text-center'
                      variant='danger'
                    >
                      {props.t('enterValidCode')}
                    </Alert>
                  </Form.Group>
                  <Form.Group
                    controlId='validationCustom07'
                    className='form-outline form-white mb-3 text-center mx-5'
                  >
                    {props.userDetail.birthday !== undefined &&
                    props.userDetail.birthday !== null ? (
                      <Form.Check
                        type='switch'
                        className='text-start'
                        checked={props.state.parentalControl}
                        label={props.t('deleteParentalControlYear')}
                        onChange={() => setDeleteParentalControlSure(!props.state.parentalControl)}
                      />
                    ) : null}

                    {!deleteParentalControlSure ? (
                      <div>
                        <p className='fs-3 mt-1'>{props.t('enterBirthday')}</p>
                        <Form.Control
                          type='date'
                          name='birthdayDate'
                          value={state.birthdayDate}
                          onChange={(event) => userService.handleChange(event)}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {props.t('enterValidBirthday')}
                        </Form.Control.Feedback>
                      </div>
                    ) : null}
                  </Form.Group>
                </Form>
                <div className='col-3'>
                  <Button
                    name='en'
                    size='lg'
                    className='btn button px-4 my-1 question_button success_button'
                    disabled={state.code !== state.codeReturned || state.code.length === 0}
                    onClick={(element) => {
                      let json = { smsCode: state.code, additionalData: {} };
                      if (
                        state.birthdayDate &&
                        state.birthdayDate.length > 0 &&
                        !deleteParentalControlSure
                      ) {
                        json.additionalData.birthday = CreateUtil.createJsonFormatDate(
                          state.birthdayDate,
                        );
                      }

                      props.userParentControlChange({
                        json: json,
                        element: element,
                      });

                      handleClose();
                    }}
                  >
                    {props.t('send')}
                  </Button>
                </div>
                <div className='col-3'>
                  <Button
                    name='en'
                    size='lg'
                    className='btn button px-4 my-1 question_button danger_button me-2'
                    onClick={() => handleClose()}
                  >
                    {props.t('cancel')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className='row align-items-center row justify-content-center'>
                <div className='col-3'>
                  <Button
                    name='en'
                    size='lg'
                    className='btn button px-4 my-1 question_button success_button'
                    onClick={() => {
                      props.userParentControlChangeCode({
                        setState: setState,
                      });
                      setParentalControlSure(() => !parentalControlSure);
                    }}
                  >
                    {props.t('yes')}
                  </Button>
                </div>
                <div className='col-3'>
                  <Button
                    name='en'
                    size='lg'
                    className='btn button px-4 my-1 question_button danger_button me-2'
                    onClick={(e) => handleClose(e)}
                  >
                    {props.t('no')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
