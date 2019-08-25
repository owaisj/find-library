import React from 'react';
import { Button, View, Text, ScrollView } from 'react-native';
import { Content } from 'native-base';
import LibCard from '../components/LibraryCard';
import libData from '../data';

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
        {libData.map((loc, idx) => (
          <LibCard key={idx} {...loc} />
        ))}
      </Content>
    </ScrollView>
  );
}
