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

export { handleEmailChange, handlePasswordChange };
