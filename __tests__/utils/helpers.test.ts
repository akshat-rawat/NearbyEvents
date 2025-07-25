import {
  capitalizeWords,
  formatDate,
  formatTime,
} from '../../src/utils/helpers';

describe('Helper Functions', () => {
  describe('capitalizeWords', () => {
    it('should capitalize the first letter of each word', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    it('should handle empty string', () => {
      expect(capitalizeWords('')).toBe('');
    });

    it('should handle single word', () => {
      expect(capitalizeWords('hello')).toBe('Hello');
    });

    it('should handle words with mixed case', () => {
      expect(capitalizeWords('hElLo wOrLD')).toBe('Hello World');
    });
  });

  describe('formatDate', () => {
    it('should format a date correctly', () => {
      const date = '2025-07-25T10:00:00Z';
      expect(formatDate(date)).toBe('25 Jul');
    });

    it('should handle leap year date correctly', () => {
      const leapYearDate = '2024-02-29T10:00:00Z';
      expect(formatDate(leapYearDate)).toBe('29 Feb');
    });
  });

  describe('formatTime', () => {
    it('should format time correctly', () => {
      const date = '2025-07-25T05:00:00Z';
      expect(formatTime(date)).toBe('10am');
    });

    it('should format time with PM', () => {
      const date = '2025-07-25T17:00:00Z';
      expect(formatTime(date)).toBe('10pm');
    });
  });
});
