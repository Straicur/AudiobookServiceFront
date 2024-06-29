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

  handleChangeInt(event) {
    if (event.target.value != undefined) {
      this.setState((prev) => ({
        ...prev,
        [event.target.name]: parseInt(event.target.value),
      }));
    }
  }

  handleChangeDropdown(eventKey, name) {
    if (eventKey != undefined) {
      this.setState((prev) => ({
        ...prev,
        [name]: parseInt(eventKey),
      }));
    }
  }
}
