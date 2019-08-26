import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Content } from 'native-base';
import LibCard from '../components/LibraryCard';
import data from '../data';
import _ from 'lodash';

export default function(props) {
  const [page, setPage] = useState(0);
  const libData = _.chunk(data, 2);
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
          Library Location Information
        </Text>
        {libData[page].map((loc, idx) => (
          <LibCard key={idx} {...loc} />
        ))}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Button
            style={{ margin: 5 }}
            success
            onPress={() => {
              let newPage;
              if (page === libData.length - 1) {
                newPage = 0;
              } else {
                newPage = page + 1;
              }
              setPage(newPage);
            }}
          >
            <Text style={{ color: '#ffffff', marginHorizontal: 15 }}>
              Next Page
            </Text>
          </Button>
        </View>
      </Content>
    </ScrollView>
  );
}
