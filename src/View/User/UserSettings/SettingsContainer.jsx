import { HandleFetch } from '../../../Util/HandleFetch';
import { useQuery } from 'react-query';
import EditEmailModal from './EditEmailModal';
import EditPasswordModal from './EditPasswordModal';
import EditUserDataModal from './EditUserDataModal';
import DeleteUserModal from './DeleteUserModal';
import SettingsForm from './SettingsForm';
import SettingUserInfo from './SettingUserInfo';

export default function SettingsContainer(props) {
  const { isLoading, error, data, isFetching, refetch } = useQuery(
    'data',
    () =>
      HandleFetch(
        '/user/settings',
        'GET',
        null,
        props.token,
        props.i18n.language
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      },
      onSuccess: (data) => {
        props.setState({
          ...props.state,
          phoneNumber: data.phoneNumber,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          edited: data.edited,
          editableDate: data.editableDate,
        });
      },
    }
  );

  return (
    <div className='row my-5 min_container_height'>
      <div className='col-3 vertivcal_border'>
        <SettingsForm
          state={props.state}
          setState={props.setState}
          t={props.t}
          token={props.token}
          i18n={props.i18n}
        />
      </div>
      <div className='col-4'>
        <SettingUserInfo
          state={props.state}
          setState={props.setState}
          t={props.t}
          i18n={props.i18n}
        />
      </div>
      {props.state.buttonEmail ? (
        <EditEmailModal
          state={props.state}
          setState={props.setState}
          t={props.t}
          token={props.token}
          i18n={props.i18n}
        />
      ) : null}
      {props.state.buttonPassword ? (
        <EditPasswordModal
          state={props.state}
          setState={props.setState}
          t={props.t}
          token={props.token}
          i18n={props.i18n}
        />
      ) : null}
      {props.state.buttonUserData ? (
        <EditUserDataModal
          state={props.state}
          setState={props.setState}
          t={props.t}
          i18n={props.i18n}
          token={props.token}
          refetch={refetch}
        />
      ) : null}
      {props.state.buttonDelete ? (
        <DeleteUserModal
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
