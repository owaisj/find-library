import React from 'react';
import { StatusBar, TouchableOpacity, Linking } from 'react-native';
import { Header, Left, Right, Title, Subtitle, Body, Icon } from 'native-base';

export default function() {
  return (
    <Header
      noShadow
      style={{
        backgroundColor: '#0053A1',
        paddingTop: StatusBar.currentHeight,
        height: 50 + StatusBar.currentHeight
      }}
      androidStatusBarColor="#0053A1"
    >
      <Left style={{ alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://library.austintexas.gov/')}
        >
          <Icon style={{ color: '#ffffff' }} name="book" />
        </TouchableOpacity>
      </Left>
      <Body>
        <Title>Is It Open?</Title>
        <Subtitle>Austin Library Hours</Subtitle>
      </Body>
      <Right style={{ alignItems: 'center' }}>
        <TouchableOpacity>
          <Icon style={{ color: '#ffffff' }} name="pie" />
        </TouchableOpacity>
      </Right>
    </Header>
  );
}
