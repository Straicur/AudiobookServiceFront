export default class FormService {
  constructor(setState) {
    this.setState = setState;
  }

  handleChange(event) {
    if (event.target.value != undefined) {
      this.setState((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  }

  handleProviderChange(event) {
    if (event.target.value != undefined) {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }

  handleProviderChangeInt(event) {
    if (event.target.value != undefined) {
      this.setState({
        [event.target.name]: parseInt(event.target.value),
      });
    }
  }

  handleProviderChangeDropDown(eventKey, name) {
    if (eventKey != undefined) {
      this.setState((prev) => ({
        ...prev,
        [name]: parseInt(eventKey),
      }));
    }
  }

  handleChangeInt(event) {
    if (event.target.value != undefined) {
      this.setState((prev) => ({
        ...prev,
        [event.target.name]: parseInt(event.target.value),
      }));
    }
  }
}
