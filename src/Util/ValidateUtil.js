export default class ValidateUtil {
  static validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  static validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  }

  static validateBirthday(parentalControl, birthdayDate) {

    let birthday = Date.parse(birthdayDate)
    birthday = new Date(birthday)
    let today = new Date();

    if (!parentalControl) {
      return true;
    }

    if (parentalControl && birthday >= today) {
      return false;
    }

    return parentalControl && birthdayDate !== '';
  }

  static validatePhoneNumber(phoneNumber) {
    const re = /^\+?[0-9]{3}-?[0-9]{6,12}$/;
    return re.test(phoneNumber);
  }

  static validatePasswordStrength(password) {
    const moderate =
      /(?=.*[A-Z])(?=.*[a-z]).{5,}|(?=.*[\d])(?=.*[a-z]).{5,}|(?=.*[\d])(?=.*[A-Z])(?=.*[a-z]).{5,}/;
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const extraStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    let strength = 10;

    if (extraStrong.test(password)) {
      strength = 100;
    } else if (strong.test(password)) {
      strength = 50;
    } else if (moderate.test(password)) {
      strength = 25;
    } else if (password.length > 0) {
      strength = 10;
    }

    return strength;
  }

  static validateName(name) {
    const re = /^[A-Za-z]+(?:\s[A-Za-z]+)?$/;
    return re.test(name);
  }

  static validateLastName(lastName) {
    const re =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñńçčšžźÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    return re.test(lastName);
  }
}
