import React from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';

export default function({ name, handleChange, open }) {
  return (
    <Button
      onPress={() => {
        handleChange();
      }}
      danger={!open}
      success={open}
      style={{ margin: 5 }}
    >
      <Text style={{ color: '#ffffff', marginHorizontal: 15 }}>{name}</Text>
    </Button>
  );
}
