function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePassword(pass) {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(pass);
}

const handleEmailChange = (event,state,setState) => {
  setState({
    ...state,
    email: event.target.value,
  });
};

const handlePasswordChange = (event,state,setState) => {
  setState({
    ...state,
    password: event.target.value,
  });
};

const handleConfirmPasswordChange = (event,state,setState) => {
  setState({
    ...state,
    confirmPassword: event.target.value,
  });
};

const handlePhoneNumber = (event,state,setState) => {
  setState({
    ...state,
    phoneNumber: event.target.value,
  });
};

const handleFirstname = (event,state,setState) => {
  setState({
    ...state,
    firstname: event.target.value,
  });
};

const handleLastname = (event,state,setState) => {
  setState({
    ...state,
    lastname: event.target.value,
  });
};

export {
  validateEmail,
  validatePassword,
  handleEmailChange,
  handlePasswordChange,
  handleConfirmPasswordChange,
  handlePhoneNumber,
  handleFirstname,
  handleLastname,
};
