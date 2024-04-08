import md5 from 'md5';
import FormService from 'Service/Common/FormService';
import { useTokenStore } from 'Store/store';
import ValidateUtil from 'Util/ValidateUtil';
import { HandleFetch } from 'Util/HandleFetch';

export default class UserLoginService extends FormService {
  constructor(formState, setFormState, props, i18n) {
    super(props.setState);
    this.formState = formState;
    this.setFormState = setFormState;
    this.props = props;
    this.i18n = i18n;
  }

  tokenStore = useTokenStore();

  fetchToken = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;

    if (form.checkValidity() == true && ValidateUtil.validateEmail(form[0].value)) {
      this.props.setState((prev) => ({
        ...prev,
        validated: true,
      }));

      HandleFetch(
        '/authorize',
        'POST',
        {
          email: this.props.state.email,
          password: md5(this.props.state.password),
        },
        this.i18n.language,
      )
        .then((data) => {
          console.log(data);
          this.tokenStore.setToken(data);
        })
        .catch((e) => {
          this.props.setState((prev) => ({
            ...prev,
            error: e,
          }));
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
