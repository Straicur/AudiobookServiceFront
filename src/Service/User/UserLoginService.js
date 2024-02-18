import md5 from 'md5';
import FormService from 'Service/Common/FormService';
import { useTokenStore } from 'Store/store';
import ValidateUtil from 'Util/ValidateUtil';

export default class UserLoginService extends FormService {
  constructor(formState, setFormState, props, i18n) {
    super(props.setState);
    this.formState = formState;
    this.setFormState = setFormState;
    this.props = props;
    this.i18n = i18n;
  }

  fetchData = useTokenStore();

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
