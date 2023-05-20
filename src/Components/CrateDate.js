export const CreateDate = (timeStamp) => {
  const dateFormat = new Date(timeStamp);

  const day =
    dateFormat.getDate() < 10
      ? "0" + dateFormat.getDate()
      : dateFormat.getDate();
  const month =
    dateFormat.getMonth() < 10
      ? "0" + (dateFormat.getMonth() + 1)
      : dateFormat.getMonth() + 1;
  const year = dateFormat.getFullYear();

  return year + "-" + month + "-" + day;
};
