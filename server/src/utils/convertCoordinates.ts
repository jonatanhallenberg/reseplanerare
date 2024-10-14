export const convertWGS84toRT90 = (latitude: number, longitude: number) => {
  const longitudeRT90 = (6378137.0 * longitude * Math.PI) / 180.0;
  const latitudeRT90 =
    3189068.5 *
    Math.log(
      (1.0 + Math.sin((latitude * Math.PI) / 180.0)) /
        (1.0 - Math.sin((latitude * Math.PI) / 180.0))
    );
  return { latitudeRT90, longitudeRT90 };
};

export const convertRT90toWGS84 = (x: number, y: number) => {
  const latitude = Math.atan(
    (Math.exp(y / 3189068.5) - 1) / Math.exp(x / 6378137.0)
  );
  const longitude = ((x / 6378137.0) * 180.0) / Math.PI;
  return { latitude, longitude };
};
