export default interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: {
    latitude: number;
    longitude: number;
  };
  isJoined?: boolean;
}
