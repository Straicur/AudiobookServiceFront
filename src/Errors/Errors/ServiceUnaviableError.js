export default class ServiceUnaviableError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServiceUnaviableError';
  }
}
