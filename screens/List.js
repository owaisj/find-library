import React from 'react';
import { Button, View, Text, ScrollView } from 'react-native';
import { Content } from 'native-base';
import LibCard from '../components/LibraryCard';

export default function(props) {
  return (
    <ScrollView>
      <Content
        padder
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <Text style={{ textAlign: 'center', margin: 15 }}>
          Display location information for the libraries.
        </Text>
        <LibCard />
      </Content>
    </ScrollView>
  );
}
