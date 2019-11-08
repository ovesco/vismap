export const distBetweenInMeters = (lat1, lon1, lat2, lon2) => {
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1)
    * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  return dist * 1.609344 * 1000;
};

export const makeGrid = (cols, rows, lat, lng, southWest, northEast) => {
  // lat vertical, lng horizontal
  const height = ((southWest.lat) - lat) / (rows / 2);
  const width = ((northEast.lng) - lng) / (cols / 2);
  const grid = [];
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      grid.push({
        lng: southWest.lng + (j * width) + (width / 2),
        lat: northEast.lat + (i * height) + (height / 2),
        i,
        j,
        radius: distBetweenInMeters(lng, lat, lng + (width / 2), lat + (height / 2)),
      });
    }
  }
  return grid;
};
