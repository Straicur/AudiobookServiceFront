import { HandleFetch } from 'Util/HandleFetch';

export default class AdminNotificationsEditService {
  constructor(
    notificationsState,
    setNotificationsState,
    props,
    actionState,
    setActionState,
    deleteState,
    setDelteteState,
  ) {
    this.notificationsState = notificationsState;
    this.setNotificationsState = setNotificationsState;
    this.props = props;
    this.actionState = actionState;
    this.setActionState = setActionState;
    this.deleteState = deleteState;
    this.setDelteteState = setDelteteState;
  }

  handleClose = () => {
    this.props.setState({
      ...this.props.state,
      editNotificationkModal: !this.props.state.editNotificationkModal,
      refresh: !this.props.state.refresh,
    });
  };

  changeNotificationType = (element) => {
    if (element.target.value != 0) {
      this.setNotificationsState({
        ...this.notificationsState,
        notificationType: parseInt(element.target.value),
      });
    }
  };

  changeUserType = (element) => {
    if (element.target.value != 0) {
      this.setNotificationsState({
        ...this.notificationsState,
        userType: parseInt(element.target.value),
      });
    }
  };

  changeText = (element) => {
    this.setNotificationsState({
      ...this.notificationsState,
      text: element.target.value,
    });
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

        this.setDelteteState({
          ...this.deleteState,
          sure: !this.deleteState.sure,
        });

        this.setNotificationsState({
          ...this.notificationsState,
          delete: !this.notificationsState.delete,
        });
      })
      .catch((e) => {
        this.props.setNotificationsState({
          ...this.props.notificationsState,
          error: e,
        });
      });
  };

  selectActionId = () => {
    this.setActionState({
      ...this.actionState,
      list: true,
    });
  };
  goBack = () => {
    this.setActionState({
      ...this.actionState,
      list: false,
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
        this.props.setState({
          ...this.props.state,
          editNotificationkModal: !this.props.state.editNotificationkModal,
          refresh: !this.props.state.refresh,
        });
      })
      .catch((e) => {
        this.props.setNotificationsState({
          ...this.props.notificationsState,
          error: e,
        });
      });
  };
}
