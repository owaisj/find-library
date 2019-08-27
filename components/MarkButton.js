import React from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';

export default function({ name, handleChange }) {
  return (
    <Button
      onPress={() => {
        console.log('You pressed the button');
        handleChange();
      }}
      warning={name === 'Central Library'}
      info={name !== 'Central Library'}
      style={{ margin: 5 }}
    >
      <Text style={{ color: '#ffffff', marginHorizontal: 15 }}>{name}</Text>
    </Button>
  );
}
