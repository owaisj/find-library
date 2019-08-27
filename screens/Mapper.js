import React, { Component } from 'react';
import { ScrollView, Dimensions, View, Text, Icon } from 'react-native';
import { Content, Button } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import MarkButton from '../components/MarkButton';
import data from '../data';
import { checkOpen, checkClosed } from '../utils';

export default class Mapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Central Library',
      latitude: 30.269498922,
      longitude: -97.74083037,
      description: 'The central branch of the Austin Public Library',
      libData: data,
      page: 0,
      filter: 'ALL'
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { filter } = this.state;
    if (prevState.filter !== filter) {
      switch (filter) {
        case 'OPEN':
          const openLibs = data.filter(loc => checkOpen(loc));
          return this.setState({ libData: openLibs, ...openLibs[0] });
        case 'CLOSED':
          const closedLibs = data.filter(loc => checkClosed(loc));
          return this.setState({
            libData: closedLibs,
            ...closedLibs[0]
          });
        default:
          return this.setState({ libData: data, ...data[0] });
      }
    }
  }

  render() {
    const { width } = Dimensions.get('screen');
    const { latitude, longitude, name, description, libData } = this.state;
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
            <Text style={{ margin: 10 }}>On map: {this.state.name}</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <Button
                disabled={this.state.filter === 'OPEN'}
                style={{ margin: 5 }}
                light
                onPress={() => {
                  this.setState({ filter: 'OPEN' });
                }}
              >
                <Text style={{ color: 'green', marginHorizontal: 15 }}>
                  List Open
                </Text>
              </Button>
              <Button
                disabled={this.state.filter === 'ALL'}
                style={{ margin: 5 }}
                light
                onPress={() => {
                  this.setState({ filter: 'ALL' });
                }}
              >
                <Text style={{ color: 'black', marginHorizontal: 15 }}>
                  List All
                </Text>
              </Button>
              <Button
                disabled={this.state.filter === 'CLOSED'}
                style={{ margin: 5 }}
                light
                onPress={() => {
                  this.setState({ filter: 'CLOSED' });
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
