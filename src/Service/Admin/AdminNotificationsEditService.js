import FormService from 'Service/Common/FormService';

export default class AdminNotificationsEditService extends FormService {
  constructor(notificationsState, setNotificationsState, props, actionState, setActionState) {
    super(setNotificationsState);
    this.notificationsState = notificationsState;
    this.setNotificationsState = setNotificationsState;
    this.props = props;
    this.actionState = actionState;
    this.setActionState = setActionState;
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
}
