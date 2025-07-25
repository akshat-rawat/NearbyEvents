import { MOCK_EVENT_LIST } from '../../src/utils/constants';
import { sortByDate, sortByDistance } from '../../src/utils/sort';

describe('Sort Functions', () => {
  it('sorts by date ascending', () => {
    const [first] = sortByDate(MOCK_EVENT_LIST);
    expect(first.id).toBe('2');
  });

  it('sorts by distance ascending', () => {
    const [first] = sortByDistance(MOCK_EVENT_LIST, 0, 0);
    expect(first.id).toBe('3');
  });
});
