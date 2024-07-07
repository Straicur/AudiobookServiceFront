import md5 from 'md5';
import FormService from 'Service/Common/FormService';
import { useTokenStore } from 'Store/store';
import ValidateUtil from 'Util/ValidateUtil';

export default class UserLoginService extends FormService {
  constructor(formState, setFormState, props, login) {
    super(props.setState);
    this.formState = formState;
    this.setFormState = setFormState;
    this.props = props;
    this.login = login;
  }

  tokenStore = useTokenStore();

  fetchToken = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;

    if (form.checkValidity() === true && ValidateUtil.validateEmail(form[0].value)) {
      this.props.setState((prev) => ({
        ...prev,
        validated: true,
      }));

      this.login({
        email: this.props.state.email,
        password: md5(this.props.state.password),
      });
    } else {
      this.props.setState((prev) => ({
        ...prev,
        isButtonDisabled: true,
        validated: false,
      }));
    }
  };
}
