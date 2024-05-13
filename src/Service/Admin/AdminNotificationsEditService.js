import FormService from 'Service/Common/FormService';

export default class AdminNotificationsEditService extends FormService {
  constructor(notificationState, setNotificationState, props, actionState, setActionState) {
    super(setNotificationState);
    this.notificationState = notificationState;
    this.setNotificationState = setNotificationState;
    this.props = props;
    this.actionState = actionState;
    this.setActionState = setActionState;
  }

  handleClose = () => {
    this.setNotificationState((prev) => ({
      ...prev,
      editNotificationModal: !this.notificationState.editNotificationModal,
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
}
