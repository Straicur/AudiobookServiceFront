export default class CreateUtil {
    static createDate = (timeStamp) => {
        const dateFormat = new Date(timeStamp);

        const day =
            dateFormat.getDate() < 9
                ? '0' + dateFormat.getDate()
                : dateFormat.getDate();
        const month =
            dateFormat.getMonth() < 9
                ? '0' + (dateFormat.getMonth() + 1)
                : dateFormat.getMonth() + 1;
        const year = dateFormat.getFullYear();

        return year + '-' + month + '-' + day;
    };

    static createJsonFormatDate = (date) => {
        const dateFormat = new Date(date);

        const day = dateFormat.getDate();
        const month =
            dateFormat.getMonth() < 10
                ? '0' + (dateFormat.getMonth() + 1)
                : dateFormat.getMonth() + 1;
        const year = dateFormat.getFullYear();

        const data = day + '.' + month + '.' + year;

        return data;
    };

    static createTime = (seconds) => {
        const time = new Date(seconds * 1000).toISOString().slice(11, 19);
        if (time.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)) {
            return time;
        }
    };

}