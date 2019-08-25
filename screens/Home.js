import React from 'react';
import { Text } from 'react-native';
import { Content } from 'native-base';
import LibCard from '../components/LibraryCard';

export default function(props) {
  return (
    <Content
      padder
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'space-between'
      }}
    >
      <Text>An app to view the nearest open library</Text>
      <LibCard />
      <Text>Multiple cards will be displayed here</Text>
    </Content>
  );
}
