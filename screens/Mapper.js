import React, { Component } from 'react';
import { ScrollView, Dimensions, View, Text, Icon } from 'react-native';
import { Content, Button } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import MarkButton from '../components/MarkButton';
import data from '../data';
import _ from 'lodash';

// TODO: FILTERS - ALL, NORTH, SOUTH, CENTRAL
export default class Mapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Central Library',
      latitude: 30.269498922,
      longitude: -97.74083037,
      description: 'The central branch of the Austin Public Library',
      page: 0
    };
  }

  render() {
    const { width } = Dimensions.get('screen');
    const { latitude, longitude, name, description, page } = this.state;
    const libData = _.chunk(data, 2);
    return (
      <ScrollView>
        <Content>
          <MapView
            style={{ width, height: 175 }}
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
              Click a button to change the map view.
            </Text>
            <Text style={{ margin: 10 }}>Now viewing {this.state.name}</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              {libData[page].map((location, idx) => (
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
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <Button
                style={{ margin: 5 }}
                success
                onPress={() => {
                  let newPage;
                  if (page === 0) {
                    newPage = libData.length - 1;
                  } else {
                    newPage = page - 1;
                  }
                  this.setState({ ...libData[newPage][0], page: newPage });
                }}
              >
                <Text style={{ color: '#ffffff', marginHorizontal: 15 }}>
                  {'<<<'}
                </Text>
              </Button>
              <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>
                {(page + 1).toString()}
              </Text>
              <Button
                style={{ margin: 5 }}
                success
                onPress={() => {
                  let newPage;
                  if (page === libData.length - 1) {
                    newPage = 0;
                  } else {
                    newPage = page + 1;
                  }
                  this.setState({ ...libData[newPage][0], page: newPage });
                }}
              >
                <Text style={{ color: '#ffffff', marginHorizontal: 15 }}>
                  {'>>>'}
                </Text>
              </Button>
            </View>
          </View>
        </Content>
      </ScrollView>
    );
  }
}
