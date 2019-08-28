import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, Dimensions, View, Text, Icon } from 'react-native';
import { Content, Button } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import Context from '../context';
import MarkButton from '../components/MarkButton';
import data from '../data';
import { checkOpen, checkClosed } from '../utils';

// TODO: Region object as state
export default function(props) {
  const [name, setName] = useState('Central Library');
  const [latitude, setLatitude] = useState(30.269498922);
  const [longitude, setLongitude] = useState(-97.74083037);
  const [description, setDescription] = useState(
    'The central branch of the Austin Public Library'
  );
  const [libData, setLibData] = useState(data);
  const { filter, setFilter } = useContext(Context);

  useEffect(() => {
    switch (filter) {
      case 'OPEN':
        const openLibs = data.filter(loc => checkOpen(loc));
        setName(openLibs[0].name);
        setDescription(openLibs[0].description);
        setLatitude(openLibs[0].latitude);
        setLongitude(openLibs[0].longitude);
        setLibData(openLibs);
        return;
      case 'CLOSED':
        const closedLibs = data.filter(loc => checkClosed(loc));
        setName(closedLibs[0].name);
        setDescription(closedLibs[0].description);
        setLatitude(closedLibs[0].latitude);
        setLongitude(closedLibs[0].longitude);
        setLibData(closedLibs);
        return;
      default:
        setName(data[0].name);
        setDescription(data[0].description);
        setLatitude(data[0].latitude);
        setLongitude(data[0].longitude);
        setLibData(data);
        return;
    }
  }, [filter]);

  const { width } = Dimensions.get('screen');
  return (
    <ScrollView>
      <Content>
        <MapView
          style={{ width, height: 200 }}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          minZoomLevel={15}
        >
          <Marker
            title={name}
            coordinate={{ latitude, longitude }}
            description={description}
          />
        </MapView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}
        >
          <Text style={{ margin: 5 }}>
            Click a button to change the marker.
          </Text>
          <Text style={{ margin: 10 }}>On map: {name}</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <Button
              disabled={filter === 'OPEN'}
              style={{ margin: 5 }}
              light
              onPress={() => {
                setFilter({ type: 'VIEW_OPEN' });
              }}
            >
              <Text style={{ color: 'green', marginHorizontal: 15 }}>
                List Open
              </Text>
            </Button>
            <Button
              disabled={filter === 'ALL'}
              style={{ margin: 5 }}
              light
              onPress={() => {
                setFilter({ type: 'VIEW_ALL' });
              }}
            >
              <Text style={{ color: 'black', marginHorizontal: 15 }}>
                List All
              </Text>
            </Button>
            <Button
              disabled={filter === 'CLOSED'}
              style={{ margin: 5 }}
              light
              onPress={() => {
                setFilter({ type: 'VIEW_CLOSED' });
              }}
            >
              <Text style={{ color: 'red', marginHorizontal: 15 }}>
                List Closed
              </Text>
            </Button>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {libData.map((location, idx) => (
              <MarkButton
                key={idx}
                {...location}
                open={checkOpen(location)}
                handleChange={() => {
                  setName(location.name);
                  setDescription(location.description);
                  setLatitude(location.latitude);
                  setLongitude(location.longitude);
                }}
              />
            ))}
          </View>
        </View>
        <Text style={{ textAlign: 'center' }}>
          Now viewing {filter} libraries
        </Text>
      </Content>
    </ScrollView>
  );
}
