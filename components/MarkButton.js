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
      warning
      style={{ margin: 5 }}
    >
      <Text style={{ color: '#ffffff', marginHorizontal: 15 }}>{name}</Text>
    </Button>
  );
}

// this.setState({
//   title: 'Old Quarry Branch',
//   description: 'Off of Far West',
//   latitude: 30.35298,
//   longitude: -97.75513
// });
