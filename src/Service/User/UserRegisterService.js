import { HandleFetch } from 'Util/HandleFetch';
import md5 from 'md5';
import CreateUtil from 'Util/CreateUtil';
import ValidateUtil from 'Util/ValidateUtil';

export default class UserRegisterService {
  constructor(formState, setFormState, props, i18n) {
    this.formState = formState;
    this.setFormState = setFormState;
    this.props = props;
    this.i18n = i18n;
  }

  handleEmailChange = (event) => {
    this.props.setState({
      ...this.props.state,
      email: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.props.setState({
      ...this.props.state,
      password: event.target.value,
      passwordStrength: ValidateUtil.validatePasswordStrength(event.target.value),
    });
  };

  handleConfirmPasswordChange = (event) => {
    this.props.setState({
      ...this.props.state,
      confirmPassword: event.target.value,
    });
  };

  handlePhoneNumber = (event) => {
    this.props.setState({
      ...this.props.state,
      phoneNumber: event.target.value,
    });
  };

  handleFirstname = (event) => {
    this.props.setState({
      ...this.props.state,
      firstname: event.target.value,
    });
  };

  handleLastname = (event) => {
    this.props.setState({
      ...this.props.state,
      lastname: event.target.value,
    });
  };

  handleParentalControl = () => {
    this.props.setState({
      ...this.props.state,
      parentalControl: !this.props.parentalControl,
    });
  };

  handleBirthdayDate = (event) => {
    this.props.setState({
      ...this.props.state,
      birthdayDate: event.target.value,
    });
  };

  getPasswordStrenghtProgressColor(passStr) {
    switch (passStr) {
      case 10:
        return 'danger';
      case 25:
        return 'warning';
      case 50:
        return 'success';
      case 100:
        return 'info';
    }
  }

  handleRegister = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.setState({
      ...this.props.state,
      isButtonDisabled: true,
      validated: false,
    });

    if (
      this.props.state.password == this.props.state.confirmPassword &&
      ValidateUtil.validateEmail(this.props.state.email) &&
      ValidateUtil.validatePassword(this.props.state.password)
    ) {
      const url = '/register';
      const jsonData = {
        email: this.props.state.email,
        phoneNumber: this.props.state.phoneNumber,
        firstname: this.props.state.firstname,
        lastname: this.props.state.lastname,
        password: md5(this.props.state.password),
      };

      if (this.props.state.parentalControl) {
        jsonData.additionalData = {
          birthday: CreateUtil.createJsonFormatDate(this.props.state.birthdayDate),
        };
      }

      const method = 'PUT';

      HandleFetch(url, method, jsonData, null, this.i18n.language)
        .then(() => {
          this.setFormState({
            ...this.formState,
            modal: true,
          });
        })
        .catch((e) => {
          this.props.setState({
            ...this.props.state,
            error: e,
          });
        });
    }
  };
}
