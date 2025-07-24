import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import Event from '../models/event.dto';
import { capitalizeWords } from '../utils/helpers';

const events: Event[] = Array.from({ length: 20 }).map(() => {
  const start = faker.date.soon({ days: 10 });
  const end = new Date(
    start.getTime() + faker.number.int({ min: 60, max: 180 }) * 60000,
  );

  return {
    id: uuidv4(),
    title: capitalizeWords(faker.lorem.words({ min: 1, max: 3 })),
    description: faker.lorem.sentences(3),
    startTime: start.toISOString(),
    endTime: end.toISOString(),
    location: {
      latitude: faker.location.latitude({ min: 12.9, max: 12.99 }),
      longitude: faker.location.longitude({ min: 77.57, max: 77.7 }),
    },
    isJoined: faker.datatype.boolean(),
  };
});

export const getEvents = async () => events;

export const getEventById = async (id: string) =>
  events.find(e => e.id === id)!;
