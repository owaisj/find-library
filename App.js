import React, { Component, Fragment } from 'react';
import { Text } from 'react-native';
import { Container, Content, Footer } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation';
import Header from './components/Header';
import Home from './screens/Home';
import List from './screens/List';
import Mapper from './screens/Mapper';

const MainNavigator = createMaterialTopTabNavigator(
  {
    Home: { screen: Home },
    List: { screen: List },
    Map: { screen: Mapper }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#4630eb'
      }
    }
  }
);

const Root = createAppContainer(MainNavigator);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });

    this.setState({
      loading: false
    });
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }

    return (
      <Fragment>
        <Container>
          <Header />
          <Root />
          <Footer style={{ alignItems: 'center', backgroundColor: '#4630eb' }}>
            <Text style={{ color: 'white' }}>Made by Owais Jamil 2019</Text>
          </Footer>
        </Container>
      </Fragment>
    );
  }
}
