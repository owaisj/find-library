import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Content, Form, Item, Label, Input } from 'native-base';
import libData from '../data';

// TODO: Integrate this in to the List.js and Mapper.js components
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      matches: []
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const oldValue = prevState.value;
    if (oldValue !== this.state.value) {
      let matches = libData.filter(location => {
        // Starts with search text
        // Global and Case Insensitive
        const regex = new RegExp(`${this.state.value}`, 'gi');
        return location.name.match(regex);
      });
      if (this.state.value === '') matches = [];
      this.setState({ matches });
    }
  }
  render() {
    return (
      <Content>
        <View>
          <Text>You Typed: {this.state.value}</Text>
          <Text>
            Matching Libraries:{' '}
            {this.state.matches.map(location => location.name).join(', ')}
          </Text>
        </View>
        <Form>
          <Item floatingLabel>
            <Label>Search</Label>
            <Input onChangeText={value => this.setState({ value })} />
          </Item>
        </Form>
      </Content>
    );
  }
}
