const { distance, point } = require('turf');

module.exports = (storages, userCoords) => {
  const storageAndDistance = [];

  storages.forEach((storage) => {
    const distanceFromUser = distance(
      point(storage.location.coordinates),
      point(userCoords)
    );
    storageAndDistance.push([storage, distanceFromUser]);
  });

  const sortedStorages = storageAndDistance.sort((a, b) => {
    a[1] - b[1];
  });
  return sortedStorages;
};
