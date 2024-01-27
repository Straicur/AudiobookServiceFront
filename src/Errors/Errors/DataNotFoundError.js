export default class DataNotFoundError extends Error {
  constructor(message, data) {
    super(message);
    this.name = 'DataNotFoundError';
    this.data = data;
  }
}
