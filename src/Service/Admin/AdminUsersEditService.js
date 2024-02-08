import { HandleFetch } from 'Util/HandleFetch';
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

  banUser = () => {
    HandleFetch(
      '/admin/user/ban',
      'PATCH',
      {
        userId: this.props.state.editUserElement.id,
        banned: !this.props.state.editUserElement.banned,
      },
      this.props.token,
      this.props.i18n.language,
    )
      .then(() => {
        const newSelcetedUser = {
          active: this.props.state.editUserElement.active,
          banned: !this.props.state.editUserElement.banned,
          dateCreated: this.props.state.editUserElement.dateCreated,
          email: this.props.state.editUserElement.email,
          firstname: this.props.state.editUserElement.firstname,
          id: this.props.state.editUserElement.id,
          lastname: this.props.state.editUserElement.lastname,
          roles: this.props.state.editUserElement.roles,
        };

        this.props.setState((prev) => ({
          ...prev,
          editUserElement: newSelcetedUser,
        }));
      })
      .catch((e) => {
        this.props.setState((prev) => ({
          ...prev,
          error: e,
        }));
      });
  };

  activateUser = (element) => {
    element.target.classList.add('disabled');
    HandleFetch(
      '/admin/user/activate',
      'PATCH',
      {
        userId: this.props.state.editUserElement.id,
      },
      this.props.token,
      this.props.i18n.language,
    )
      .then(() => {
        element.target.classList.remove('disabled');

        const newSelcetedUser = {
          active: !this.props.state.editUserElement.active,
          banned: this.props.state.editUserElement.banned,
          dateCreated: this.props.state.editUserElement.dateCreated,
          email: this.props.state.editUserElement.email,
          firstname: this.props.state.editUserElement.firstname,
          id: this.props.state.editUserElement.id,
          lastname: this.props.state.editUserElement.lastname,
          roles: this.props.state.editUserElement.roles,
        };

        this.props.setState((prev) => ({
          ...prev,
          editUserElement: newSelcetedUser,
        }));
      })
      .catch((e) => {
        this.props.setState((prev) => ({
          ...prev,
          error: e,
        }));
      });
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
      HandleFetch(
        '/admin/user/change/password',
        'PATCH',
        {
          userId: this.props.state.editUserElement.id,
          newPassword: this.passwordState.password,
        },
        this.props.token,
        this.props.i18n.language,
      )
        .then(() => {
          this.setPasswordState((prev) => ({
            ...prev,
            sure: !this.passwordState.sure,
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

  changeUserPhone = () => {
    if (!ValidateUtil.validatePhoneNumber(this.phoneNumberState.phoneNumber)) {
      this.setPhoneNumberState((prev) => ({
        ...prev,
        wrong: !this.phoneNumberState.wrong,
        buttonDisabled: !this.phoneNumberState.buttonDisabled,
        sure: !this.phoneNumberState.sure,
      }));
    } else {
      HandleFetch(
        '/admin/user/change/phone',
        'PATCH',
        {
          userId: this.props.state.editUserElement.id,
          newPhone: this.phoneNumberState.phoneNumber,
        },
        this.props.token,
        this.props.i18n.language,
      )
        .then(() => {
          this.setPhoneNumberState((prev) => ({
            ...prev,
            sure: !this.phoneNumberState.sure,
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
