export default function getFormattedDate(date) {
  const twoDigits = (number) => (number < 10 ? `0${number}` : number);

  const day = twoDigits(date.getDate());
  const month = twoDigits(date.getMonth() + 1);
  const year = date.getFullYear().toString().substr(2, 2);
  const DMY = `${day}.${month}.${year}`;

  const hours = twoDigits(date.getHours());
  const minutes = twoDigits(date.getMinutes());
  const time = `${hours}:${minutes}`;

  return `${DMY} ${time}`;
}
