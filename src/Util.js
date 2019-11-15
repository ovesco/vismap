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

export const makeGrid = (_southWest, _northEast) => {
  const width = distBetweenInMeters(0, _northEast.lng, 0, _southWest.lng);
  const height = distBetweenInMeters(_northEast.lat, 0, _southWest.lat, 0);
  const horizontalCircles = Math.ceil(Math.abs(width) / 50000) + 1;
  const verticalCircles = Math.ceil(Math.abs(height) / 50000) + 1;
  const lngSpace = Math.abs((_southWest.lng - _northEast.lng) / horizontalCircles);
  const latSpace = Math.abs((_southWest.lat - _northEast.lat) / verticalCircles);
  const map = [];
  for (let i = 0; i < horizontalCircles; i += 1) {
    for (let j = 0; j < verticalCircles; j += 1) {
      map.push({
        lng: _southWest.lng + (i * lngSpace),
        lat: _southWest.lat + (j * latSpace),
      });
    }
  }
  return map;
};
