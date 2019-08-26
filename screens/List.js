import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Content, Form, Item, Label, Input } from 'native-base';
import LibCard from '../components/LibraryCard';
import data from '../data';
import _ from 'lodash';

// TODO: Filters - ALL, OPEN, CLOSED
export default function(props) {
  // Component Level State
  const [show, setShow] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const [libData, setLibData] = useState(data);

  useEffect(() => {
    let matches = data.filter(location => {
      // Starts with search text
      // Global and Case Insensitive
      const regex = new RegExp(`${searchVal}`, 'gi');
      return location.name.match(regex);
    });
    if (searchVal === '') {
      setShow(true);
      matches = data;
    } else {
      setShow(false);
    }
    setLibData(matches);
  }, [searchVal]);

  // const libData = _.chunk(data, 2);
  return (
    <ScrollView>
      <Content
        padder
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <Form>
          <Item stackedLabel>
            <Label style={{ fontWeight: 'bold' }}>"Checkout" a Library</Label>
            <Input
              onChangeText={text => setSearchVal(text)}
              placeholderTextColor="grey"
              placeholder="Try Old Quarry"
            />
          </Item>
        </Form>

        <View>
          {libData.map((loc, idx) => (
            <LibCard key={idx} {...loc} />
          ))}
        </View>
        <Text style={{ textAlign: 'center', margin: 15 }}>
          Currently Viewing: {libData.map(location => location.name).join(', ')}
        </Text>
      </Content>
    </ScrollView>
  );
}
