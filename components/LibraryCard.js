import React from 'react';
import { Image, TouchableOpacity, View, Linking } from 'react-native';
import { Card, CardItem, Body, Text, Left, Right, Icon } from 'native-base';
import { checkOpen } from '../utils';

const LocationCard = ({
  name = 'Central Library',
  address = ['710 W Cesar Chavez St', 'Austin, TX 78701'],
  pNumber = '512-974-7400',
  image = 'https://library.austintexas.gov/sites/default/files/ncl_location_page_large.jpg',
  hours = {
    Sun: ['12pm', '6pm'],
    Mon: ['10am', '9pm'],
    Tue: ['10am', '9pm'],
    Wed: ['10am', '9pm'],
    Thu: ['10am', '9pm'],
    Fri: ['10am', '6pm'],
    Sat: ['10am', '6pm']
  },
  latitude = 30.26569,
  longitude = -97.75178
}) => {
  return (
    <Card>
      <CardItem header bordered button>
        <Text>{name}</Text>
      </CardItem>
      <CardItem body bordered>
        <Image
          source={{ uri: image }}
          style={{ height: 200, width: null, flex: 1 }}
        />
      </CardItem>
      <CardItem
        bordered
        style={{ flexDirection: 'row', justifyContent: 'center' }}
      >
        {checkOpen({ hours }) ? (
          <Text style={{ color: 'green' }}>Open!</Text>
        ) : (
          <Text style={{ color: 'red' }}>Closed</Text>
        )}
      </CardItem>
      <CardItem
        bordered
        style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
      >
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Hours</Text>

          {Object.keys(hours).map((day, idx) => {
            return (
              <Text key={idx} style={{ fontSize: 10 }}>
                {day}: {hours[day].join(' - ')}
              </Text>
            );
          })}
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Address</Text>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 10 }} selectable>
              {address.join('\n')}
            </Text>
          </View>
        </View>
      </CardItem>
      <CardItem footer bordered>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <TouchableOpacity onPress={() => Linking.openURL(`tel://${pNumber}`)}>
            <Text>
              <Icon style={{ fontSize: 15 }} name="call" />
              {'  '}
              {pNumber}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL(`geo:${latitude},${longitude}`)}
          >
            <Text>
              <Icon style={{ fontSize: 15 }} name="map" />
              {'  '}
              {latitude.toFixed(2)}, {longitude.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      </CardItem>
    </Card>
  );
};

export default LocationCard;
