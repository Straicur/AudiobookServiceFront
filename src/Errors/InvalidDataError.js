export default class InvalidDataError extends Error {
  constructor(message, data) {
    super(message);
    this.name = "InvalidDataError";
    this.data = data;
  }
}
