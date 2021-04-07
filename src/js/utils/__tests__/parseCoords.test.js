import parseCoords from '../parseCoords';

describe('Test valid coords', () => {
  const testCases = [
    ['[51.12345, 51.12345]', { latitude: '51.12345', longitude: '51.12345' }],
    ['51.12345, 51.12345', { latitude: '51.12345', longitude: '51.12345' }],
    ['51.123456, 51.123456', { latitude: '51.123456', longitude: '51.123456' }],
    ['51.12345,51.12345', { latitude: '51.12345', longitude: '51.12345' }],
    ['-51.12345, 51.12345', { latitude: '-51.12345', longitude: '51.12345' }],
    ['−51.12345, 51.12345', { latitude: '-51.12345', longitude: '51.12345' }],
    ['−51.12345, 179.12345', { latitude: '-51.12345', longitude: '179.12345' }],
  ];

  test.each(testCases)('%s', (string, expected) => {
    const result = parseCoords(string);
    expect(result).toEqual(expected);
  });
});

describe('Test invalid coords', () => {
  const testCases = [
    ['51.12345,, 81.12345'],
    ['51.12345, 181.12345'],
    ['51.12345, -196.12345'],
    ['-151.12345, -96.12345'],
    ['170.12345, 51.12345'],
    ['51.12345, 51.12345, 51.12345'],
    ['51.34, 51.34'],
    ['51.12345678, -86.12345678'],
  ];

  test.each(testCases)('%s', (string) => {
    expect(() => parseCoords(string)).toThrow(
      Error('Неверные координаты или формат координат'),
    );
  });
});
