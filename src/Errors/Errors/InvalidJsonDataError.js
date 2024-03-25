export default class InvalidJsonDataError extends Error {
  constructor(message, data) {
    super(message);
    this.name = 'InvalidJsonDataError';
    this.data = data;
  }
}
