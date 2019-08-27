/*
  These are utility functions used in callbacks for higher order fns.
  obj refers to the location object in each array.
*/
import Moment from 'moment-timezone';
import * as turf from '@turf/turf';

// Library Data Object as parameters
export const checkOpen = obj => {
  const { hours } = obj;
  const now = Moment().tz('America/Chicago');
  const today = now.format('ddd');
  const openTime = Moment(hours[today][0], 'ha');
  const closeTime = Moment(hours[today][1], 'ha');
  let check;
  if (hours[today][0] === 'Closed') {
    check = false;
  } else {
    check = now.isBetween(openTime, closeTime);
  }
  return check;
};

export const checkClosed = obj => {
  const { hours } = obj;
  const now = Moment().tz('America/Chicago');
  const today = now.format('ddd');
  const openTime = Moment(hours[today][0], 'ha');
  const closeTime = Moment(hours[today][1], 'ha');
  let check;
  if (hours[today][0] === 'Closed') {
    check = false;
  } else {
    check = now.isBetween(openTime, closeTime);
  }
  return !check;
};

// Array of Libraries and userLocation object
export const sortLibs = (libArr, userLocation) =>
  libArr
    .map((item, idx) => {
      const user = [userLocation.latitude, userLocation.longitude];
      const lib = [item.latitude, item.longitude];
      const dist = turf.distance(user, lib, {
        units: 'miles'
      });
      return { name: item.name, dist };
    })
    .sort((a, b) => a.dist - b.dist);
