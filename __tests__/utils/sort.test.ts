import { sortByDate, sortByDistance } from '../../src/utils/sort';

const list = [
  {
    id: '1',
    title: 'Event 1',
    description: '',
    startTime: '2025-01-02',
    endTime: '2025-01-04',
    location: { latitude: 0, longitude: 3 },
  },
  {
    id: '2',
    title: 'Event 2',
    description: '',
    startTime: '2025-01-01',
    endTime: '2025-01-04',
    location: { latitude: 0, longitude: 2 },
  },
  {
    id: '3',
    title: 'Event 3',
    description: '',
    startTime: '2025-01-03',
    endTime: '2025-01-04',
    location: { latitude: 0, longitude: 0 },
  },
];

describe('Sort Functions', () => {
  it('sorts by date ascending', () => {
    const [first] = sortByDate(list);
    expect(first.id).toBe('2');
  });

  it('sorts by distance ascending', () => {
    const [first] = sortByDistance(list, 0, 0);
    expect(first.id).toBe('3');
  });
});
