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
}
