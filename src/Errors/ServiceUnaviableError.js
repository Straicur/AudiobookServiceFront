class InvalidJsonDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServiceUnaviableError";
  }
}