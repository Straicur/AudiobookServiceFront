import React from 'react';
import { HandleFetch } from 'Util/HandleFetch';
import { useQuery } from '@tanstack/react-query';
import UserSettingsEditEmailModal from './UserSettingsEditEmailModal';
import UserSettingsEditPasswordModal from './UserSettingsEditPasswordModal';
import UserSettingsEditUserDataModal from './UserSettingsEditUserDataModal';
import UserSettingsDeleteUserModal from './UserSettingsDeleteUserModal';
import UserSettingsForm from './UserSettingsForm';
import UserSettingInfo from './UserSettingInfo';

export default function UserSettingsContainer(props) {
  const { refetch } = useQuery(
    'data',
    () => HandleFetch('/user/settings', 'GET', null, props.token, props.i18n.language),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        props.setState((prev) => ({
          ...prev,
          error: e,
        }));
      },
      onSuccess: (data) => {
        props.setState((prev) => ({
          ...prev,
          phoneNumber: data.phoneNumber,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          edited: data.edited,
          editableDate: data.editableDate,
        }));
      },
    },
  );

  return (
    <div className='row my-5 min_container_height'>
      <div className='col-3 vertivcal_border'>
        <UserSettingsForm
          state={props.state}
          setState={props.setState}
          t={props.t}
          token={props.token}
          i18n={props.i18n}
        />
      </div>
      <div className='col-4'>
        <UserSettingInfo
          state={props.state}
          setState={props.setState}
          t={props.t}
          i18n={props.i18n}
        />
      </div>
      {props.state.buttonEmail ? (
        <UserSettingsEditEmailModal
          state={props.state}
          setState={props.setState}
          t={props.t}
          token={props.token}
          i18n={props.i18n}
        />
      ) : null}
      {props.state.buttonPassword ? (
        <UserSettingsEditPasswordModal
          state={props.state}
          setState={props.setState}
          t={props.t}
          token={props.token}
          i18n={props.i18n}
        />
      ) : null}
      {props.state.buttonUserData ? (
        <UserSettingsEditUserDataModal
          state={props.state}
          setState={props.setState}
          t={props.t}
          i18n={props.i18n}
          token={props.token}
          refetch={refetch}
        />
      ) : null}
      {props.state.buttonDelete ? (
        <UserSettingsDeleteUserModal
          state={props.state}
          setState={props.setState}
          t={props.t}
          i18n={props.i18n}
          navigate={props.navigate}
          token={props.token}
        />
      ) : null}
    </div>
  );
}
