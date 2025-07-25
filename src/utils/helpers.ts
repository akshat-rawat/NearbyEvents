export function capitalizeWords(str: string): string {
  if (!str) return '';

  return str
    .split(' ')
    .map(word =>
      word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : '',
    )
    .join(' ');
}

export function formatDate(dateISO: string): string {
  const date = new Date(dateISO);

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
  }).format(date);
}

export function formatTime(dateISO: string): string {
  const date = new Date(dateISO);

  return new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    hour12: true,
  })
    .format(date)
    .replace(/\s/g, '')
    .toLowerCase();
}

// Ref: https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d.toFixed(1);
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
