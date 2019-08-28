import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Content, Form, Item, Label, Input } from 'native-base';
import Context from '../context';
import LibCard from '../components/LibraryCard';
import data from '../data';
import { checkClosed, checkOpen } from '../utils';

// TODO: Fix search UI
export default function(props) {
  const [searchVal, setSearchVal] = useState('');
  const [libData, setLibData] = useState(data);
  const { filter, setFilter } = useContext(Context);
  useEffect(() => {
    switch (filter) {
      case 'OPEN':
        return setLibData(data.filter(location => checkOpen(location)));
      case 'CLOSED':
        return setLibData(data.filter(location => checkClosed(location)));
      default:
        return setLibData(data);
    }
  }, [filter]);

  useEffect(() => {
    let matches = libData.filter(location => {
      // Starts with search text
      // Global and Case Insensitive
      const regex = new RegExp(`${searchVal}`, 'gi');
      return location.name.match(regex);
    });
    if (searchVal === '') {
      matches = libData;
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
          <Button
            info
            onPress={() => {
              setFilter({ type: 'VIEW_ALL' });
            }}
          >
            <Text style={{ color: '#ffffff', marginHorizontal: 15 }}>
              View All
            </Text>
          </Button>
          <Button
            success
            onPress={() => {
              setFilter({ type: 'VIEW_OPEN' });
            }}
          >
            <Text style={{ color: '#ffffff', marginHorizontal: 15 }}>Open</Text>
          </Button>

          <Button
            danger
            onPress={() => {
              setFilter({ type: 'VIEW_CLOSED' });
            }}
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
              value={searchVal}
              onChangeText={text => setSearchVal(text)}
              placeholderTextColor="grey"
              placeholder="Try Old Quarry"
            />
          </Item>
        </Form>
        <Text style={{ textAlign: 'center' }}>
          Now viewing {filter} libraries
        </Text>
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
