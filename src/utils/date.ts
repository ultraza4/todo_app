
export const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  // в JS месяцы идут от 0 до 11, поэтому добавляем 1
  const month = ('0' + (date.getMonth() + 1)).slice(-2);  // добавляем ведущий ноль если нужно
  const day = ('0' + date.getDate()).slice(-2);  // добавляем ведущий ноль если нужно

  return `${year}-${month}-${day}`;
}