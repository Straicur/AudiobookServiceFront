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
  });
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export { handleEmailChange, handlePasswordChange, validateEmail };
