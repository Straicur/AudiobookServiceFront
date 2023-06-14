import { HandleFetch } from "../../../Components/HandleFetch";
import { useQuery } from "react-query";
import EditEmailModal from "./EditEmailModal";
import EditPasswordModal from "./EditPasswordModal";
import EditUserDataModal from "./EditUserDataModal";
import DeleteUserModal from "./DeleteUserModal";
import SettingsForm from ".//SettingsForm";
import SettingUserInfo from "./SettingUserInfo";

export default function SettingsContainer(props) {
  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/user/settings",
        "GET",
        null,
        props.token
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
    <div className="row">
      <div className="col">
        <SettingUserInfo
          state={props.state}
          setState={props.setState}
          t={props.t}
        />
      </div>
      <div className="col">
        <SettingsForm
          state={props.state}
          setState={props.setState}
          t={props.t}
          token={props.token}
        />
      </div>

      {props.state.buttonEmail ? (
        <EditEmailModal
          state={props.state}
          setState={props.setState}
          t={props.t}
          token={props.token}
        />
      ) : null}
      {props.state.buttonPassword ? (
        <EditPasswordModal
          state={props.state}
          setState={props.setState}
          t={props.t}
          token={props.token}
        />
      ) : null}
      {props.state.buttonUserData ? (
        <EditUserDataModal
          state={props.state}
          setState={props.setState}
          t={props.t}
          token={props.token}
          refetch={refetch}
        />
      ) : null}
      {props.state.buttonDelete ? (
        <DeleteUserModal
          state={props.state}
          setState={props.setState}
          t={props.t}
          navigate={props.navigate}
          token={props.token}
        />
      ) : null}
    </div>
  );
}
