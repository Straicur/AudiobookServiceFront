export const CreateJsonFormatDate = (date) => {
  const dateFormat = new Date(date);

  const day = dateFormat.getDate();
  const month =
    dateFormat.getMonth() < 10
      ? "0" + (dateFormat.getMonth() + 1)
      : dateFormat.getMonth() + 1;
  const year = dateFormat.getFullYear();

  const data = day + "." + month + "." + year;

  return data;
};
