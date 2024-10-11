export default class CreateUtil {
  static createDate = (timeStamp) => {
    const dateFormat = new Date(timeStamp);

    const day = dateFormat.getDate() < 9 ? '0' + dateFormat.getDate() : dateFormat.getDate();
    const month =
      dateFormat.getMonth() < 9 ? '0' + (dateFormat.getMonth() + 1) : dateFormat.getMonth() + 1;
    const year = dateFormat.getFullYear();

    return year + '-' + month + '-' + day;
  };

  static createDateTime = (timeStamp) => {
    const dateFormat = new Date(timeStamp);

    const day = String(dateFormat.getDate()).padStart(2, '0');
    const month = String(dateFormat.getMonth() + 1).padStart(2, '0');
    const year = dateFormat.getFullYear();

    const hours = String(dateFormat.getHours()).padStart(2, '0');
    const minutes = String(dateFormat.getMinutes()).padStart(2, '0');
    const seconds = String(dateFormat.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  static createJsonFormatDate = (date) => {
    const dateFormat = new Date(date);

    const day = dateFormat.getDate();
    const month =
      dateFormat.getMonth() < 9 ? '0' + (dateFormat.getMonth() + 1) : dateFormat.getMonth() + 1;
    const year = dateFormat.getFullYear();

    return day + '.' + month + '.' + year;
  };

  static createJsonFormatDateTime = (date) => {
    const dateFormat = new Date(date);

    const day = dateFormat.getDate();
    const month =
      dateFormat.getMonth() < 9 ? '0' + (dateFormat.getMonth() + 1) : dateFormat.getMonth() + 1;
    const year = dateFormat.getFullYear();
    const hour = dateFormat.getHours();
    const minutes = dateFormat.getMinutes();

    return day + '.' + month + '.' + year + ' ' + hour + ':' + minutes;
  };

  static createTime = (seconds) => {
    const time = new Date(seconds * 1000).toISOString().slice(11, 19);
    if (time.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)) {
      return time;
    }
  };
}
