import { HandleFetch } from 'Util/HandleFetch';
import md5 from 'md5';
import CreateUtil from 'Util/CreateUtil';

export default class UserRegisterService {
  constructor(formState, setFormState, props, i18n) {
    this.formState = formState;
    this.setFormState = setFormState;
    this.props = props;
    this.i18n = i18n;
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
      this.validateEmail(this.props.state.email) &&
      this.validatePassword(this.props.state.password)
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

  validatePasswordStrength(pass) {
    const moderate =
      /(?=.*[A-Z])(?=.*[a-z]).{5,}|(?=.*[\d])(?=.*[a-z]).{5,}|(?=.*[\d])(?=.*[A-Z])(?=.*[a-z]).{5,}/;
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const extraStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    let strength = 10;

    if (extraStrong.test(pass)) {
      strength = 100;
    } else if (strong.test(pass)) {
      strength = 50;
    } else if (moderate.test(pass)) {
      strength = 25;
    } else if (pass.length > 0) {
      strength = 10;
    }
    return strength;
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
      passwordStrength: this.validatePasswordStrength(event.target.value),
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
}
