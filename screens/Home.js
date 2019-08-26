import React from 'react';
import { Text, ScrollView, Image, View } from 'react-native';
import { Content, Card, CardItem } from 'native-base';
import Moment from 'moment-timezone';

export default function(props) {
  const currentTime = Moment()
    .tz('America/Chicago')
    .format('hh:mma z');
  return (
    <ScrollView>
      <Content
        padder
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: 400
        }}
      >
        <Text>It is {currentTime} in Austin</Text>
        <Image
          source={{
            uri:
              'https://library.austintexas.gov/sites/default/files/misc/blue_apl_logo.png'
          }}
          style={{
            width: 300,
            height: 150,
            resizeMode: 'center'
          }}
        />
        <Text>
          Have you ever wanted to know which libraries are currently open AND
          nearby? This app can give you that information!
        </Text>
      </Content>
    </ScrollView>
  );
}
