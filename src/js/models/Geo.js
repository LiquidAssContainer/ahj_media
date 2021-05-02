export default class Geo {
  constructor() {
    if (!navigator.geolocation) {
      throw new Error('В этом браузере не работает(');
    }
  }

  getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let { latitude, longitude } = position.coords;
          latitude = latitude.toFixed(6);
          longitude = longitude.toFixed(6);
          resolve({ latitude, longitude });
        },
        (err) => {
          reject(err);
        },
      );
    });
  }
}
