function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePassword(pass) {
  const re =
    /(?=.*[A-Z])(?=.*[a-z])(?=.*[\d]).{7,}|(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=.*[\d]).{7,}/g;
  return re.test(pass);
}

function validateBirthday(state){
  return (state.parentalControl && state.birthdayDate)
}

function getPasswordStrenghtText(t, passStr) {
  switch (passStr) {
    case 10:
      return <p class="text-center text-danger">{t("weakPassword")}</p>;
    case 25:
      return <p class="text-center text-warning">{t("moderatePassword")}</p>;
    case 50:
      return <p class="text-center text-success">{t("strongPassword")}</p>;
    case 100:
      return <p class="text-center text-info">{t("extraStrongPassword")}</p>;
  }
}

function getPasswordStrenghtProgressColor(passStr) {
  switch (passStr) {
    case 10:
      return "danger";
    case 25:
      return "warning";
    case 50:
      return "success";
    case 100:
      return "info";
  }
}

function validatePasswordStrength(pass) {
  const moderate =
    /(?=.*[A-Z])(?=.*[a-z]).{5,}|(?=.*[\d])(?=.*[a-z]).{5,}|(?=.*[\d])(?=.*[A-Z])(?=.*[a-z]).{5,}/;
  const strong =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const extraStrong =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

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

function validatePhoneNumber(pass) {
  const re = /^\+?[0-9]{3}-?[0-9]{6,12}$/;
  return re.test(pass);
}

const handleEmailChange = (event, state, setState) => {
  setState({
    ...state,
    email: event.target.value,
  });
};

const handlePasswordChange = (event, state, setState) => {
  setState({
    ...state,
    password: event.target.value,
    passwordStrength: validatePasswordStrength(event.target.value),
  });
};

const handleConfirmPasswordChange = (event, state, setState) => {
  setState({
    ...state,
    confirmPassword: event.target.value,
  });
};

const handlePhoneNumber = (event, state, setState) => {
  setState({
    ...state,
    phoneNumber: event.target.value,
  });
};

const handleFirstname = (event, state, setState) => {
  setState({
    ...state,
    firstname: event.target.value,
  });
};

const handleLastname = (event, state, setState) => {
  setState({
    ...state,
    lastname: event.target.value,
  });
};

const handleParentalControl = (state, setState) => {
  setState({
    ...state,
    parentalControl: !state.parentalControl,
  });
};

const handleBirthdayDate = (event, state, setState) => {
  setState({
    ...state,
    birthdayDate: event.target.value,
  });
};

export {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  handleEmailChange,
  handlePasswordChange,
  handleConfirmPasswordChange,
  handlePhoneNumber,
  handleFirstname,
  handleLastname,
  getPasswordStrenghtText,
  getPasswordStrenghtProgressColor,
  handleParentalControl,
  handleBirthdayDate,
  validateBirthday
};
