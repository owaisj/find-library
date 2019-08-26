import React, { Component } from 'react';
import { ScrollView, Dimensions, View, Text } from 'react-native';
import { Content, Button } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import MarkButton from '../components/MarkButton';
import libData from '../data';

// TODO: Pagination - Chunk the data array
export default class Mapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Central Library',
      latitude: 30.269498922,
      longitude: -97.74083037,
      description: 'The central branch of the Austin Public Library'
    };
  }

  render() {
    const { width } = Dimensions.get('screen');
    const { latitude, longitude, name, description } = this.state;
    return (
      <ScrollView>
        <Content>
          <MapView
            style={{ width, height: 300 }}
            region={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
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
            <Text style={{ margin: 15 }}>
              Click a button to change the map view.
            </Text>
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
                  handleChange={() =>
                    this.setState({
                      name: location.name,
                      description: location.description,
                      latitude: location.latitude,
                      longitude: location.longitude
                    })
                  }
                />
              ))}
            </View>
          </View>
        </Content>
      </ScrollView>
    );
  }
}
