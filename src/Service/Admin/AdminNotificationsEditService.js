import { HandleFetch } from 'Util/HandleFetch';
import FormService from 'Service/Common/FormService';

export default class AdminNotificationsEditService extends FormService {
  constructor(
    notificationsState,
    setNotificationsState,
    props,
    actionState,
    setActionState,
    deleteState,
    setDelteteState,
  ) {
    super(setNotificationsState);
    this.notificationsState = notificationsState;
    this.setNotificationsState = setNotificationsState;
    this.props = props;
    this.actionState = actionState;
    this.setActionState = setActionState;
    this.deleteState = deleteState;
    this.setDelteteState = setDelteteState;
  }

  handleClose = () => {
    this.setNotificationsState((prev) => ({
      ...prev,
      editNotificationkModal: !this.notificationsState.editNotificationkModal,
    }));

    this.props.setState((prev) => ({
      ...prev,
      refresh: !this.props.state.refresh,
    }));
  };

  selectActionId = () => {
    this.setActionState((prev) => ({
      ...prev,
      list: true,
    }));
  };

  goBack = () => {
    this.setActionState((prev) => ({
      ...prev,
      list: false,
    }));
  };

  deleteNotification = (element) => {
    element.target.classList.add('disabled');
    HandleFetch(
      '/admin/user/notification/delete',
      'PATCH',
      {
        notificationId: this.notificationsState.id,
        delete: !this.notificationsState.delete,
      },
      this.props.token,
      this.props.i18n.language,
    )
      .then(() => {
        element.target.classList.remove('disabled');

        this.setDelteteState((prev) => ({
          ...prev,
          sure: !this.deleteState.sure,
        }));

        this.setNotificationsState((prev) => ({
          ...prev,
          delete: !this.notificationsState.delete,
        }));
      })
      .catch((e) => {
        this.props.setNotificationsState((prev) => ({
          ...prev,
          error: e,
        }));
      });
  };

  saveChanges = () => {
    HandleFetch(
      '/admin/user/notification',
      'PATCH',
      {
        notificationId: this.notificationsState.id,
        notificationType: this.notificationsState.notificationType,
        notificationUserType: this.notificationsState.userType,
        actionId: this.notificationsState.actionId,
        additionalData: {
          text: this.notificationsState.text,
        },
      },
      this.props.token,
      this.props.i18n.language,
    )
      .then(() => {
        this.props.setState((prev) => ({
          ...prev,
          editNotificationkModal: !this.props.state.editNotificationkModal,
          refresh: !this.props.state.refresh,
        }));
      })
      .catch((e) => {
        this.props.setNotificationsState((prev) => ({
          ...prev,
          error: e,
        }));
      });
  };
}
