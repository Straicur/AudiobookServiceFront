import { HandleFetch } from 'Util/HandleFetch';
import FormService from 'Service/Common/FormService';

export default class AdminNotificationsAddService extends FormService {
  constructor(props, modalState, setModalState, actionState, setActionState) {
    super(props.setModalState);
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
