import md5 from 'md5';
import { useTokenStore } from 'Store/store';
import ValidateUtil from 'Util/ValidateUtil';

export default class UserLoginService {
  constructor(formState, setFormState, props, i18n) {
    this.formState = formState;
    this.setFormState = setFormState;
    this.props = props;
    this.i18n = i18n;
  }

  fetchData = useTokenStore();

  handleEmailChange = (event) => {
    this.props.setState((prev) => ({
      ...prev,
      email: event.target.value,
    }));
  };

  handlePasswordChange = (event) => {
    this.props.setState((prev) => ({
      ...prev,
      password: event.target.value,
    }));
  };

  fetchToken = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;

    if (form.checkValidity() == true && ValidateUtil.validateEmail(form[0].value)) {
      this.props.setState((prev) => ({
        ...prev,
        validated: true,
      }));

      this.fetchData.setToken(
        {
          email: this.props.state.email,
          password: md5(this.props.state.password),
        },
        this.props.state,
        this.props.setState,
        this.i18n.language,
      );
    } else {
      this.props.setState((prev) => ({
        ...prev,
        isButtonDisabled: true,
        validated: false,
      }));
    }
  };
}
