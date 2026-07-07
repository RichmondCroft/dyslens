import { hexToRgb } from './hexToRgb';

describe('hexToRgb', () => {
  it('converts a 6-digit hex color to an rgb() string', () => {
    expect(hexToRgb('#d3322e')).toBe('rgb(211, 50, 46)');
  });

  it('converts a hex color without a leading #', () => {
    expect(hexToRgb('1e1e1e')).toBe('rgb(30, 30, 30)');
  });

  it('is case-insensitive', () => {
    expect(hexToRgb('#FFB92E')).toBe(hexToRgb('#ffb92e'));
  });

  it('returns null for an invalid hex string', () => {
    expect(hexToRgb('not-a-color')).toBeNull();
  });
});
