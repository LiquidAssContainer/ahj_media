export default function parseCoords(string) {
  const errorMessage = 'Неверные координаты или формат координат';

  let coords = string.replace(/(^\[)|(\]$)/g, '');
  // просто возможность ввести знак минус, а не знак дефис
  coords = coords.replace(/−/g, '-');
  const coordsArr = coords.split(/,\s*/g);

  if (coordsArr.length !== 2) {
    throw new Error(errorMessage);
  }

  const regexp = /^-?\d{1,3}\.\d{4,6}$/;
  for (let coord of coordsArr) {
    if (!regexp.test(coord)) {
      throw new Error(errorMessage);
    }
    coord = parseFloat(coord);
  }

  const [latitude, longitude] = coordsArr;

  if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
    throw new Error(errorMessage);
  }

  return { latitude, longitude };
}
