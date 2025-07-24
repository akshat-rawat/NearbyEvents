import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import Event from '../models/event.dto';
import { capitalizeWords } from '../utils/helpers';

let events: Event[] = [];

export const getEvents = async (latitude = 12.9, longitude = 77.6) => {
  events = Array.from({ length: 20 }).map(() => {
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
        latitude: faker.location.latitude({
          min: latitude - 0.1,
          max: latitude + 0.1,
        }),
        longitude: faker.location.longitude({
          min: longitude - 0.1,
          max: longitude + 0.1,
        }),
      },
      isJoined: faker.datatype.boolean(),
    };
  });

  return events;
};

export const getEventById = async (id: string) =>
  events.find(e => e.id === id)!;
