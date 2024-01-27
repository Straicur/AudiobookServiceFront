import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { HandleFetch } from '../../../Util/HandleFetch';
import Alert from 'react-bootstrap/Alert';

export default function EditUserFrom(props) {
  const [passwordState, setPasswordState] = useState({
    password: '',
    sure: false,
    wrong: false,
    buttonDisabled: false,
  });
  const [phoneNumberState, setPhoneNumberState] = useState({
    phoneNumber: '',
    sure: false,
    wrong: false,
    buttonDisabled: false,
  });

  const banUser = () => {
    HandleFetch(
      '/admin/user/ban',
      'PATCH',
      {
        userId: props.state.editUserElement.id,
        banned: !props.state.editUserElement.banned,
      },
      props.token,
      props.i18n.language,
    )
      .then(() => {
        const newSelcetedUser = {
          active: props.state.editUserElement.active,
          banned: !props.state.editUserElement.banned,
          dateCreated: props.state.editUserElement.dateCreated,
          email: props.state.editUserElement.email,
          firstname: props.state.editUserElement.firstname,
          id: props.state.editUserElement.id,
          lastname: props.state.editUserElement.lastname,
          roles: props.state.editUserElement.roles,
        };

        props.setState({ ...props.state, editUserElement: newSelcetedUser });
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  };

  const activateUser = (element) => {
    element.target.classList.add('disabled');
    HandleFetch(
      '/admin/user/activate',
      'PATCH',
      {
        userId: props.state.editUserElement.id,
      },
      props.token,
      props.i18n.language,
    )
      .then(() => {
        element.target.classList.remove('disabled');

        const newSelcetedUser = {
          active: !props.state.editUserElement.active,
          banned: props.state.editUserElement.banned,
          dateCreated: props.state.editUserElement.dateCreated,
          email: props.state.editUserElement.email,
          firstname: props.state.editUserElement.firstname,
          id: props.state.editUserElement.id,
          lastname: props.state.editUserElement.lastname,
          roles: props.state.editUserElement.roles,
        };

        props.setState({ ...props.state, editUserElement: newSelcetedUser });
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  };

  const handlePasswordChange = (event) => {
    setPasswordState({
      ...passwordState,
      password: event.target.value,
      buttonDisabled: false,
      wrong: false,
    });
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumberState({
      ...phoneNumberState,
      phoneNumber: event.target.value,
      buttonDisabled: false,
      wrong: false,
    });
  };

  function validatePassword(pass) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(pass);
  }

  const changeUserPassword = () => {
    if (!validatePassword(passwordState.password)) {
      setPasswordState({
        ...passwordState,
        wrong: !passwordState.wrong,
        buttonDisabled: !passwordState.buttonDisabled,
        sure: !passwordState.sure,
      });
    } else {
      HandleFetch(
        '/admin/user/change/password',
        'PATCH',
        {
          userId: props.state.editUserElement.id,
          newPassword: passwordState.password,
        },
        props.token,
        props.i18n.language,
      )
        .then(() => {
          setPasswordState({
            ...passwordState,
            sure: !passwordState.sure,
          });
        })
        .catch((e) => {
          props.setState({
            ...props.state,
            error: e,
          });
        });
    }
  };

  function validatePhoneNumber(pass) {
    const re = /^\+?[0-9]{3}-?[0-9]{6,12}$/;
    return re.test(pass);
  }

  const changeUserPhone = () => {
    if (!validatePhoneNumber(phoneNumberState.phoneNumber)) {
      setPhoneNumberState({
        ...phoneNumberState,
        wrong: !phoneNumberState.wrong,
        buttonDisabled: !phoneNumberState.buttonDisabled,
        sure: !phoneNumberState.sure,
      });
    } else {
      HandleFetch(
        '/admin/user/change/phone',
        'PATCH',
        {
          userId: props.state.editUserElement.id,
          newPhone: phoneNumberState.phoneNumber,
        },
        props.token,
        props.i18n.language,
      )
        .then(() => {
          setPhoneNumberState({
            ...phoneNumberState,
            sure: !phoneNumberState.sure,
          });
        })
        .catch((e) => {
          props.setState({
            ...props.state,
            error: e,
          });
        });
    }
  };

  return (
    <div className='row mt-3 align-items-center'>
      <hr></hr>
      <div className='row align-items-center'>
        <h3>{props.t('active/ban')}</h3>
      </div>
      <div className='row align-items-center mt-2'>
        <div className='col-2'>{props.t('active')}:</div>
        <div className='col-2'>
          {props.state.editUserElement.active ? (
            <i className='bi bi-bookmark-check-fill'></i>
          ) : (
            <i className='bi bi-bookmark-dash'></i>
          )}
        </div>
        <div className='col-4 align-self-center'>
          <Button
            variant='warning'
            size='sm'
            disabled={props.state.editUserElement.active}
            className=' btn button text-light'
            onClick={(e) => {
              activateUser(e);
            }}
          >
            {props.t('activate')}
          </Button>
        </div>
      </div>
      <div className='row mb-3 align-items-center mt-2'>
        <div className='col-2'>{props.t('banned')}:</div>
        <div className='col-2'>
          {props.state.editUserElement.banned ? (
            <i className='bi bi-shield-fill-exclamation'></i>
          ) : (
            <i className='bi bi-shield-fill-check'></i>
          )}
        </div>
        <div className='col-4 align-self-center'>
          <Button
            variant='warning'
            size='sm'
            className=' btn button text-light'
            onClick={() => {
              banUser();
            }}
          >
            {props.state.editUserElement.banned ? props.t('unban') : props.t('ban')}
          </Button>
        </div>
      </div>
      <hr></hr>
      <div className='row'>
        <h3>{props.t('changeData')}</h3>
      </div>
      <InputGroup className='mb-1 input_modal ms-3'>
        <InputGroup.Text className='input_group_text'>{props.t('changePassword')}</InputGroup.Text>
        <Form.Control
          type='password'
          onChange={(event) => {
            handlePasswordChange(event);
          }}
        />
      </InputGroup>
      <div className='row input_modal ms-3'>
        <div>
          <Alert
            show={passwordState.wrongState}
            className='dangerAllert mt-1 text-center'
            variant='danger'
          >
            {props.t('enterValidPassword')}
          </Alert>
        </div>
      </div>
      {passwordState.sure ? (
        <div className='row justify-content-center mt-2 mb-1'>
          <div className='col-3'>
            <Button
              name='en'
              size='sm'
              className='btn button px-4 my-1 question_button success_button'
              onClick={(e) => changeUserPassword(e)}
            >
              {props.t('yes')}
            </Button>
          </div>
          <div className='col-3'>
            <Button
              name='en'
              size='sm'
              className='btn button px-4 my-1 question_button danger_button me-2'
              onClick={() =>
                setPasswordState({
                  ...passwordState,
                  sure: !passwordState.sure,
                })
              }
            >
              {props.t('no')}
            </Button>
          </div>
        </div>
      ) : (
        <div className='row justify-content-md-center mt-2 mb-1'>
          <div className='col-6'>
            <Button
              variant='success'
              size='sm'
              className=' btn button text-light my-1 button_save'
              disabled={passwordState.buttonDisabled}
              onClick={() => {
                setPasswordState({
                  ...passwordState,
                  sure: !passwordState.sure,
                });
              }}
            >
              {props.t('save')}
            </Button>
          </div>
        </div>
      )}

      <InputGroup className='mb-1 input_modal ms-3'>
        <InputGroup.Text>{props.t('changePhoneNumber')}</InputGroup.Text>
        <Form.Control
          onChange={(event) => {
            handlePhoneNumberChange(event);
          }}
        />
      </InputGroup>
      <div className='row input_modal ms-3'>
        <div>
          <Alert
            show={phoneNumberState.wrongState}
            className='dangerAllert mt-1 text-center'
            variant='danger'
          >
            {props.t('enterValidPhoneNumber')}
          </Alert>
        </div>
      </div>
      {phoneNumberState.sure ? (
        <div className='row justify-content-center mt-2 mb-1'>
          <div className='col-3'>
            <Button
              name='en'
              size='sm'
              className='btn button px-4 my-1 question_button success_button'
              onClick={(e) => changeUserPhone(e)}
            >
              {props.t('yes')}
            </Button>
          </div>
          <div className='col-3'>
            <Button
              name='en'
              size='sm'
              className='btn button px-4 my-1 question_button danger_button me-2'
              onClick={() =>
                setPhoneNumberState({
                  ...phoneNumberState,
                  sure: !phoneNumberState.sure,
                })
              }
            >
              {props.t('no')}
            </Button>
          </div>
        </div>
      ) : (
        <div className='row justify-content-md-center mt-2 mb-1'>
          <div className='col-6'>
            <Button
              variant='success'
              size='sm'
              className=' btn button text-light my-1 button_save'
              disabled={phoneNumberState.buttonDisabled}
              onClick={() => {
                setPhoneNumberState({
                  ...phoneNumberState,
                  sure: !phoneNumberState.sure,
                });
              }}
            >
              {props.t('save')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
