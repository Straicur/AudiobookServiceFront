import { HandleFetch } from 'Util/HandleFetch';
import md5 from 'md5';
import CreateUtil from 'Util/CreateUtil';
import ValidateUtil from 'Util/ValidateUtil';
import FormService from 'Service/Common/FormService';

export default class UserRegisterService extends FormService {
  constructor(formState, setFormState, props, i18n) {
    super(props.setState);
    this.formState = formState;
    this.setFormState = setFormState;
    this.props = props;
    this.i18n = i18n;
  }

  handlePasswordChange = (event) => {
    this.props.setState((prev) => ({
      ...prev,
      password: event.target.value,
      passwordStrength: ValidateUtil.validatePasswordStrength(event.target.value),
    }));
  };

  handleParentalControl = () => {
    this.props.setState((prev) => ({
      ...prev,
      parentalControl: !this.props.parentalControl,
    }));
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

    this.props.setState((prev) => ({
      ...prev,
      isButtonDisabled: true,
      validated: false,
    }));

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
          this.setFormState((prev) => ({
            ...prev,
            modal: true,
          }));
        })
        .catch((e) => {
          this.props.setState((prev) => ({
            ...prev,
            error: e,
          }));
        });
    }
  };
}
