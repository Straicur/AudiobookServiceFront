export default class ValidateUtil {
  static validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  static validatePassword(password) {
    const re =
      /(?=.*[A-Z])(?=.*[a-z])(?=.*[\d]).{7,}|(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;''<>,./?])(?=.*[a-z])(?=.*[\d]).{7,}/g;
    return re.test(password);
  }

  static validateBirthday(parentalControl, birthdayDate) {
    if (!parentalControl) {
      return true;
    }

    return parentalControl && birthdayDate != '';
  }

  static validatePhoneNumber(phoneNumber) {
    const re = /^\+?[0-9]{3}-?[0-9]{6,12}$/;
    return re.test(phoneNumber);
  }
}
