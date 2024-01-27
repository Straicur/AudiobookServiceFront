import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { HandleFetch } from '../../../Util/HandleFetch';
import { useTokenStore } from '../../../Store/store';
import { useNavigate } from 'react-router-dom';

export default function DeleteUserModal(props) {
  const tokenStore = useTokenStore();
  const navigate = useNavigate();

  const handleClose = () => {
    props.setState({
      ...props.state,
      buttonDelete: !props.state.buttonDelete,
    });
  };

  const deleteAccount = (element) => {
    element.target.classList.add('disabled');

    HandleFetch('/user/settings/delete', 'PATCH', null, props.token, props.i18n.language)
      .then(() => {
        tokenStore.removeToken();
        navigate('/login');
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  };

  useEffect(() => {
    if (props.state.error != null) {
      throw props.state.error;
    }
  }, [props.state.error]);

  return (
    <Modal
      size='lg'
      show={props.state.buttonDelete}
      onHide={handleClose}
      backdrop='static'
      centered
    >
      <Modal.Body
        style={{
          backgroundColor: '#262626',
        }}
      >
        <div className='text-white my-5'>
          <p className='fs-3 text-center'>{props.t('deleteMessage')}</p>
          <p className='fs-4 text-center'>{props.t('areYouSure')}</p>
          <div className='row align-items-center row justify-content-center'>
            <div className='col-2'>
              <Button
                name='en'
                size='sm'
                className='btn button success_button settings-button fs-5 sure_button'
                onClick={() => deleteAccount()}
              >
                {props.t('yes')}
              </Button>
            </div>
            <div className='col-2'>
              <Button
                name='en'
                size='sm'
                className='btn button danger_button settings-button fs-5 sure_button'
                onClick={(e) => handleClose(e)}
              >
                {props.t('no')}
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
