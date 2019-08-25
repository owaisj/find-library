import React from 'react';
import { Text, ScrollView } from 'react-native';
import { Content } from 'native-base';
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
          alignItems: 'center'
        }}
      >
        <Text>It is {currentTime} in Austin</Text>
        <Text>Display a list of open libraries.</Text>
      </Content>
    </ScrollView>
  );
}
