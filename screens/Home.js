import React, { useState, useEffect } from 'react';
import { Text, ScrollView, Image, View } from 'react-native';
import { Content, Card, CardItem, Body } from 'native-base';
import data from '../data';
import { checkClosed, checkOpen, sortLibs } from '../utils';

export default function(props) {
  const [userLoc, setUserLoc] = useState({
    latitude: 30.2648,
    longitude: -97.7472
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLoc({ latitude, longitude });
      },
      error => console.log(error)
    );
  }, []);
  const openLibraries = data.filter(location => checkOpen(location));
  const closedLibraries = data.filter(location => checkClosed(location));
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
        <Card>
          <CardItem header bordered>
            <Text>Nearest Open Library</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                {openLibraries.length
                  ? `${sortLibs(openLibraries, userLoc)[0].name} (${sortLibs(
                      openLibraries,
                      userLoc
                    )[0].dist.toFixed(2)} miles)`
                  : `Nothing is open at this time. However, the nearest drop-off is at ${
                      sortLibs(data, userLoc)[0].name
                    } (${sortLibs(data, userLoc)[0].dist.toFixed(2)} miles)`}
              </Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>Find more info on the locations and map tabs!</Text>
          </CardItem>
        </Card>
        <Text style={{ color: 'green', marginTop: 5 }}>Currently Open:</Text>
        <Text>
          {openLibraries.length
            ? openLibraries.map(location => location.name).join(', ')
            : 'Only digital locations at this time.'}
        </Text>
        <Text style={{ color: 'red', marginTop: 5 }}>Currently Closed:</Text>
        <Text>
          {openLibraries.length
            ? closedLibraries.map(location => location.name).join(', ')
            : 'Everything is open at this time'}
        </Text>
      </Content>
    </ScrollView>
  );
}
