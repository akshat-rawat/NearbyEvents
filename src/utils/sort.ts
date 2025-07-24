import Event from '../models/event.dto';
import { getDistanceFromLatLonInKm } from './helpers';

export const sortByDistance = (
  events: Event[],
  latitude: number,
  longitude: number,
) =>
  [...events].sort(
    (a, b) =>
      Number(
        getDistanceFromLatLonInKm(
          a.location.latitude,
          a.location.longitude,
          latitude,
          longitude,
        ),
      ) -
      Number(
        getDistanceFromLatLonInKm(
          b.location.latitude,
          b.location.longitude,
          latitude,
          longitude,
        ),
      ),
  );

export const sortByDate = (events: Event[]) =>
  [...events].sort(
    (a, b) => new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf(),
  );
