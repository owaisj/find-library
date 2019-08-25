import React, { Component } from 'react';
import { ScrollView, Dimensions, View, Text } from 'react-native';
import { Content, Button } from 'native-base';
import MapView, { Marker } from 'react-native-maps';

// TODO: Control Region with state
export default class Mapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Central Library',
      latitude: 30.269498922,
      longitude: -97.74083037,
      description: 'The central branch of the Austin Public Library'
    };
  }

  render() {
    const { width } = Dimensions.get('screen');
    const { latitude, longitude, title, description } = this.state;
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
              title={title}
              coordinate={{ latitude, longitude }}
              description={description}
            />
          </MapView>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flex: 1
            }}
          >
            <Text style={{ margin: 15 }}>
              Click a button to change the map view.
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Button
                onPress={() => {
                  console.log('You pressed the button');
                  this.setState({
                    title: 'Old Quarry Branch',
                    description: 'Off of Far West',
                    latitude: 30.35298,
                    longitude: -97.75513
                  });
                }}
                info
                style={{ marginHorizontal: 5 }}
              >
                <Text style={{ color: '#ffffff', marginHorizontal: 15 }}>
                  Old Quarry
                </Text>
              </Button>
              <Button
                onPress={() => {
                  console.log('You pressed the button');
                  this.setState({
                    title: 'Central Library',
                    latitude: 30.269498922,
                    longitude: -97.74083037,
                    description:
                      'The central branch of the Austin Public Library'
                  });
                }}
                info
                style={{ marginHorizontal: 5 }}
              >
                <Text style={{ color: '#ffffff', marginHorizontal: 15 }}>
                  Central Branch
                </Text>
              </Button>
            </View>
          </View>
        </Content>
      </ScrollView>
    );
  }
}
