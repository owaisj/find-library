import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Content, Form, Item, Label, Input } from 'native-base';
import LibCard from '../components/LibraryCard';
import data from '../data';
import { checkClosed, checkOpen } from '../utils';

export default function(props) {
  const [searchVal, setSearchVal] = useState('');
  const [filtered, setFiltered] = useState(data);
  const [libData, setLibData] = useState(data);

  useEffect(() => {
    setLibData(filtered);
  }, [filtered]);

  useEffect(() => {
    let matches = filtered.filter(location => {
      // Starts with search text
      // Global and Case Insensitive
      const regex = new RegExp(`${searchVal}`, 'gi');
      return location.name.match(regex);
    });
    if (searchVal === '') {
      matches = data;
    }
    setLibData(matches);
  }, [searchVal]);

  return (
    <ScrollView>
      <Content
        padder
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10
          }}
        >
          <Button info onPress={() => setFiltered(data)}>
            <Text style={{ color: '#ffffff', marginHorizontal: 15 }}>
              View All
            </Text>
          </Button>
          <Button
            success
            onPress={() =>
              setFiltered(data.filter(location => checkOpen(location)))
            }
          >
            <Text style={{ color: '#ffffff', marginHorizontal: 15 }}>Open</Text>
          </Button>

          <Button
            danger
            onPress={() =>
              setFiltered(data.filter(location => checkClosed(location)))
            }
          >
            <Text style={{ color: '#ffffff', marginHorizontal: 15 }}>
              Closed
            </Text>
          </Button>
        </View>
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
