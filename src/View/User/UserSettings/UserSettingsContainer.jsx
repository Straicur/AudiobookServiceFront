import React from 'react';
import UserSettingsEditEmailModal from './UserSettingsEditEmailModal';
import UserSettingsEditPasswordModal from './UserSettingsEditPasswordModal';
import UserSettingsEditUserDataModal from './UserSettingsEditUserDataModal';
import UserSettingsDeleteUserModal from './UserSettingsDeleteUserModal';
import UserSettingsForm from './UserSettingsForm';
import UserSettingInfo from './UserSettingInfo';
import { useUserSettingsData } from 'Providers/User/UserSettingsProvider';

export default function UserSettingsContainer(props) {
  const [
    userDetail,
    refetch,
    isLoading,
    userEmailChange,
    userPasswordChange,
    userDelete,
    userDataChange,
    userDataChangeCode,
    userPasswordChangeCode,
    userEmailChangeCode,
  ] = useUserSettingsData();

  return (
    <div className='row my-5 min_container_height'>
      <div className='col-3 vertivcal_border'>
        <UserSettingsForm
          state={props.state}
          setState={props.setState}
          userDetail={userDetail}
          t={props.t}
          token={props.token}
          i18n={props.i18n}
        />
      </div>
      <div className='col-7'>
        <UserSettingInfo
          state={props.state}
          setState={props.setState}
          userDetail={userDetail}
          isLoading={isLoading}
          t={props.t}
          i18n={props.i18n}
        />
      </div>
      {props.state.buttonEmail ? (
        <UserSettingsEditEmailModal
          state={props.state}
          setState={props.setState}
          userDetail={userDetail}
          userEmailChangeCode={userEmailChangeCode}
          userEmailChange={userEmailChange}
          t={props.t}
          token={props.token}
          i18n={props.i18n}
        />
      ) : null}
      {props.state.buttonPassword ? (
        <UserSettingsEditPasswordModal
          state={props.state}
          setState={props.setState}
          userDetail={userDetail}
          userPasswordChange={userPasswordChange}
          userPasswordChangeCode={userPasswordChangeCode}
          t={props.t}
          token={props.token}
          i18n={props.i18n}
        />
      ) : null}
      {props.state.buttonUserData ? (
        <UserSettingsEditUserDataModal
          state={props.state}
          setState={props.setState}
          userDetail={userDetail}
          userDataChange={userDataChange}
          userDataChangeCode={userDataChangeCode}
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
          userDetail={userDetail}
          userDelete={userDelete}
          t={props.t}
          i18n={props.i18n}
          navigate={props.navigate}
          token={props.token}
        />
      ) : null}
    </div>
  );
}
