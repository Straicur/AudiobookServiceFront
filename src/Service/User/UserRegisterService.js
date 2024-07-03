import md5 from 'md5';
import CreateUtil from 'Util/CreateUtil';
import ValidateUtil from 'Util/ValidateUtil';
import FormService from 'Service/Common/FormService';

export default class UserRegisterService extends FormService {
  constructor(formState, setFormState, props, register) {
    super(props.setState);
    this.formState = formState;
    this.setFormState = setFormState;
    this.props = props;
    this.register = register;
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
      this.props.state.password === this.props.state.confirmPassword &&
      ValidateUtil.validateEmail(this.props.state.email) &&
      ValidateUtil.validatePassword(this.props.state.password)
    ) {
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

      this.register({
        jsonData: jsonData,
        setFormState: this.setFormState,
      });
    }
  };
}
