import ValidateUtil from 'Util/ValidateUtil';

export default class AdminUsersEditService {
  constructor(passwordState, setPasswordState, props, phoneNumberState, setPhoneNumberState) {
    this.passwordState = passwordState;
    this.setPasswordState = setPasswordState;
    this.props = props;
    this.phoneNumberState = phoneNumberState;
    this.setPhoneNumberState = setPhoneNumberState;
  }

  handlePasswordChange = (event) => {
    this.setPasswordState((prev) => ({
      ...prev,
      password: event.target.value,
      buttonDisabled: false,
      wrong: false,
    }));
  };

  handlePhoneNumberChange = (event) => {
    this.setPhoneNumberState((prev) => ({
      ...prev,
      phoneNumber: event.target.value,
      buttonDisabled: false,
      wrong: false,
    }));
  };

  changeUserPassword = () => {
    if (!ValidateUtil.validatePassword(this.passwordState.password)) {
      this.setPasswordState((prev) => ({
        ...prev,
        wrong: !this.passwordState.wrong,
        buttonDisabled: !this.passwordState.buttonDisabled,
        sure: !this.passwordState.sure,
      }));
    } else {
      this.props.changeUserPassword({
        userId: this.props.state.editUserElement.id,
        setPasswordState: this.setPasswordState,
        passwordState: this.passwordState,
      });
    }
  };

  changeUserPhone = () => {
    if (!ValidateUtil.validatePhoneNumber(this.phoneNumberState.phoneNumber)) {
      this.setPhoneNumberState((prev) => ({
        ...prev,
        wrong: !this.phoneNumberState.wrong,
        buttonDisabled: !this.phoneNumberState.buttonDisabled,
        sure: !this.phoneNumberState.sure,
      }));
    } else {
      this.props.changeUserPhone({
        userId: this.props.state.editUserElement.id,
        setPhoneNumberState: this.setPhoneNumberState,
        phoneNumberState: this.phoneNumberState,
      });
    }
  };
}
