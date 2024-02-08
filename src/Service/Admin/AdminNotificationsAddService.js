import { HandleFetch } from 'Util/HandleFetch';

export default class AdminNotificationsAddService {
  constructor(props, modalState, setModalState, actionState, setActionState) {
    this.props = props;
    this.modalState = modalState;
    this.setModalState = setModalState;
    this.actionState = actionState;
    this.setActionState = setActionState;
  }

  handleClose = () => {
    this.props.setState((prev) => ({
      ...prev,
      addNotificationModal: !this.props.state.addNotificationModal,
      refresh: !this.props.state.refresh,
    }));
  };

  changeNotificationType = (element) => {
    if (element.target.value != 0) {
      this.setModalState((prev) => ({
        ...prev,
        notificationType: parseInt(element.target.value),
      }));
    }
  };

  changeUserType = (element) => {
    if (element.target.value != 0) {
      this.setModalState((prev) => ({
        ...prev,
        userType: parseInt(element.target.value),
      }));
    }
  };

  changeText = (element) => {
    this.setModalState((prev) => ({
      ...prev,
      text: element.target.value,
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

  createAdditionalData = () => {
    let additionalData = {};

    if (this.modalState.notificationType == 4) {
      additionalData.categoryKey = this.modalState.actionId;
    }
    if (this.modalState.notificationType == 5) {
      additionalData.actionId = this.modalState.actionId;
    }
    if (this.modalState.notificationType == 2) {
      additionalData.userId = this.modalState.actionId;
    }
    if (this.modalState.text != '') {
      additionalData.text = this.modalState.text;
    }

    return additionalData;
  };

  addNotification = () => {
    HandleFetch(
      '/admin/user/notification',
      'PUT',
      {
        notificationType: this.modalState.notificationType,
        notificationUserType: this.modalState.userType,
        additionalData: this.createAdditionalData(),
      },
      this.props.token,
      this.props.i18n.language,
    )
      .then(() => {
        this.props.setState((prev) => ({
          ...prev,
          addNotificationModal: !this.props.state.addNotificationModal,
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
