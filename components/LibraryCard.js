import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Card, CardItem, Body, Text, Left, Right } from 'native-base';

const LocationCard = ({
  name = 'Central Library',
  address = ['710 W Cesar Chavez St', 'Austin, TX 78701'],
  pNumber = '512-974-7400',
  imageURL = 'https://library.austintexas.gov/sites/default/files/ncl_location_page_large.jpg',
  hours = [
    'Sunday: 12PM - 6PM',
    'Monday - Thursday: 10AM - 9PM',
    'Friday - Saturday: 10AM - 6PM'
  ]
}) => {
  return (
    <Card>
      <CardItem header bordered button>
        <Text>{name}</Text>
      </CardItem>
      <CardItem body bordered>
        <Image
          source={{ uri: imageURL }}
          style={{ height: 200, width: null, flex: 1 }}
        />
      </CardItem>
      <CardItem bordered>
        <Text>Is it open?</Text>
      </CardItem>
      <CardItem
        bordered
        style={{ justifyContent: 'space-evenly', alignItems: 'flex-start' }}
      >
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Hours</Text>
          {hours.map((line, index) => (
            <Text key={index} style={{ fontSize: 10 }}>
              {line}
            </Text>
          ))}
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Address</Text>
          <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
            {address.map((line, index) => (
              <Text key={index} style={{ fontSize: 10 }}>
                {line}
              </Text>
            ))}
          </View>
        </View>
      </CardItem>
      <CardItem footer bordered>
        <Left>
          <TouchableOpacity onPress={() => console.log('You rang?')}>
            <Text>{pNumber}</Text>
          </TouchableOpacity>
        </Left>
        <Right>
          <TouchableOpacity onPress={() => console.log('You map?')}>
            <Text>View on Map</Text>
          </TouchableOpacity>
        </Right>
      </CardItem>
    </Card>
  );
};

export default LocationCard;
