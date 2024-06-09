import FormService from 'Service/Common/FormService';

export default class AdminNotificationsAddService extends FormService {
  constructor(props, modalState, setModalState, actionState, setActionState) {
    super(setModalState);
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
    }));

    this.props.setNotificationsAudiobooksState((prev) => ({
      ...prev,
      refresh: true,
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

  static createAdditionalData = (modalState) => {
    let additionalData = {};

    if (modalState.notificationType == 4) {
      additionalData.categoryKey = modalState.categoryKey;
    }
    if (modalState.notificationType == 5) {
      additionalData.actionId = modalState.actionId;
    }
    if (modalState.notificationType == 2) {
      additionalData.userId = modalState.actionId;
    }
    if (modalState.text != '') {
      additionalData.text = modalState.text;
    }

    return additionalData;
  };
}
