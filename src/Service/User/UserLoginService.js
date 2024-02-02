import md5 from 'md5';
import { useTokenStore } from 'Store/store';

export default class UserLoginService {
  constructor(formState, setFormState, props, i18n) {
    this.formState = formState;
    this.setFormState = setFormState;
    this.props = props;
    this.i18n = i18n;
  }

  fetchData = useTokenStore();

  handleEmailChange = (event) => {
    this.setState({
      ...this.state,
      email: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      ...this.state,
      password: event.target.value,
    });
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  fetchToken = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;

    if (form.checkValidity() == true && this.validateEmail(form[0].value)) {
      this.props.setState({
        ...this.props.state,
        validated: true,
      });

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
      this.props.setState({
        ...this.props.state,
        isButtonDisabled: true,
        validated: false,
      });
    }
  };
}
