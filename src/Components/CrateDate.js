export const CreateDate = (timeStamp) => {
  const dateFormat = new Date(timeStamp);

  const day = dateFormat.getDate();
  const month = dateFormat.getMonth() + 1;
  const year = dateFormat.getFullYear();

  return day + "." + month + "." + year;
}
