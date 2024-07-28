export default class UserDeletedError extends Error {
  constructor(message, data) {
    super(message);
    this.name = 'UserDeletedError';
    this.data = data;
  }
}
