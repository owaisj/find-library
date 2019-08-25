import React from 'react';
import { StatusBar } from 'react-native';
import { Header, Left, Right, Title, Subtitle, Body } from 'native-base';

export default function() {
  return (
    <Header
      style={{
        backgroundColor: '#4630eb',
        paddingTop: StatusBar.currentHeight,
        height: 50 + StatusBar.currentHeight
      }}
      androidStatusBarColor="#4630eb"
    >
      <Left />
      <Body>
        <Title>Library Hours</Title>
        <Subtitle>Austin Public Library</Subtitle>
      </Body>
      <Right />
    </Header>
  );
}
