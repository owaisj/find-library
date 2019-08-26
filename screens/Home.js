import React, { useState, useEffect } from 'react';
import { Text, ScrollView, Image, View } from 'react-native';
import { Content, Card, CardItem } from 'native-base';
import Moment from 'moment-timezone';
import * as turf from '@turf/turf';
import data from '../data';

// TODO: Create arrays of open and closed libraries
export default function(props) {
  const [userLoc, setUserLoc] = useState({
    latitude: 30.2648,
    longitude: -97.7472
  });
  const [granted, setGranted] = useState(false);
  const currentTime = Moment()
    .tz('America/Chicago')
    .format('hh:mma z');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLoc({ latitude, longitude });
        setGranted(true);
      },

      error => console.log(error)
    );
  }, []);

  return (
    <ScrollView>
      <Content
        padder
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text>
          Have you ever wanted to know which libraries are currently open AND
          nearby? This app can give you that information!
        </Text>
        <Image
          source={{
            uri:
              'https://library.austintexas.gov/sites/default/files/misc/blue_apl_logo.png'
          }}
          style={{
            width: 200,
            height: 150,
            resizeMode: 'center'
          }}
        />

        <Text style={{ color: 'green' }}>
          Libraries Sorted By Distance (mi)
        </Text>
        {data
          .map((location, idx) => {
            const user = [userLoc.latitude, userLoc.longitude];
            const lib = [location.latitude, location.longitude];
            const dist = turf.distance(user, lib, {
              units: 'miles'
            });
            return { name: location.name, dist };
          })
          .sort((a, b) => a.dist - b.dist)
          .map((location, idx) => (
            <Text key={idx}>
              {location.name}: {location.dist.toFixed(2)} miles
            </Text>
          ))}
        <Text style={{ color: 'green', marginTop: 5 }}>Currently Open:</Text>
        <Text>
          {data
            .filter(location => {
              const { hours } = location;
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
            })
            .map(location => location.name)
            .join(', ')}
        </Text>
        <Text style={{ color: 'red', marginTop: 5 }}>Currently Closed:</Text>
        <Text>
          {data
            .filter(location => {
              const { hours } = location;
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
            })
            .map(location => location.name)
            .join(', ')}
        </Text>
        <Text style={{ color: 'red', marginTop: 5 }}>Data for Analysis</Text>
        <Text>It is {currentTime} in Austin</Text>
        <Text>
          {granted ? 'Your' : "Austin City Hall's"} Geolocation: (
          {userLoc.latitude}, {userLoc.longitude})
        </Text>
      </Content>
    </ScrollView>
  );
}
