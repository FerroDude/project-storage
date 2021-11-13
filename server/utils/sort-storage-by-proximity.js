const turf = require('turf');

module.exports = (storages, lon, lat) => {
  const storageAndDistance = [];

  storages.forEach((storage) => {
    const distanceFromUser = turf.distance(
      turf.point(storage.location.coordinates),
      turf.point([lon, lat])
    );
    storageAndDistance.push([storage, distanceFromUser]);
  });

  const sortedStorages = storageAndDistance.sort((a, b) => {
    return a[1] - b[1];
  });

  return sortedStorages;
};
