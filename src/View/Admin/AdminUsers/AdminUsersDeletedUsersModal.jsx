import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useQuery } from 'react-query';
import { HandleFetch } from 'Util/HandleFetch';
import AdminUsersRenderDeletedUsersList from './AdminUsersRenderDeletedUsersList';
import AdminRenderPageSwitches from '../Common/AdminRenderPageSwitches';

export default function AdminUsersDeletedUsersModal(props) {
  const [state, setState] = useState({
    users: [],
    refresh: false,
  });

  const [pageState, setPageState] = useState({
    page: 0,
    limit: 15,
    maxPage: 1,
  });

  const handleClose = () => {
    props.setState({
      ...props.state,
      deletedUsersModal: !props.state.deletedUsersModal,
    });
  };

  const { refetch: refetchSecond } = useQuery(
    'dataSecond',
    () =>
      HandleFetch(
        '/admin/user/delete/list',
        'POST',
        {
          page: pageState.page,
          limit: pageState.limit,
        },
        props.token,
        props.i18n.language,
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        props.setUsersState({
          ...props.usersState,
          error: e,
        });
      },
      onSuccess: (data) => {
        setState({ ...state, users: data.users });
        setPageState({ ...pageState, maxPage: data.maxPage });
      },
    },
  );

  useEffect(() => {
    if (state.refresh) {
      setState({ ...state, refresh: !state.refresh });
      refetchSecond();
    }
  }, [state.refresh]);

  return (
    <Modal size='lg' show={props.state.deletedUsersModal} onHide={handleClose} backdrop='static'>
      <Modal.Header>
        <Modal.Title>{props.t('deletedUsers')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminUsersRenderDeletedUsersList
          state={state}
          setState={setState}
          token={props.token}
          t={props.t}
        />
        {state.users != null && pageState.maxPage > 1 ? (
          <AdminRenderPageSwitches
            state={state}
            setState={setState}
            pageState={pageState}
            setPageState={setPageState}
          />
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={handleClose}>
          {props.t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
