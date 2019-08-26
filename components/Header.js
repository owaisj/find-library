import React from 'react';
import { StatusBar, Dimensions } from 'react-native';
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
        <Icon style={{ color: '#ffffff' }} name="book" />
      </Left>
      <Body>
        <Title>Is It Open?</Title>
        <Subtitle>Austin Library Hours</Subtitle>
      </Body>
      <Right />
    </Header>
  );
}
