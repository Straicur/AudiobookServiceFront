export default class TechnicalBreakError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TechnicalBreakError';
  }
}
