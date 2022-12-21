export default class SystemError extends Error {
  constructor(message) {
    super(message);
    this.name = "SystemError";
  }
}
