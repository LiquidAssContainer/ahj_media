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
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (err) => {
          reject(err);
        },
      );
    });
  }
}
