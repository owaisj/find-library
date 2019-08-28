import React, { useEffect, useState, Fragment, useReducer } from 'react';
import { Text } from 'react-native';
import { Container, Content, Footer } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation';
import Context, { reducer } from './context';
import Header from './components/Header';
import Home from './screens/Home';
import List from './screens/List';
import Mapper from './screens/Mapper';

const MainNavigator = createMaterialTopTabNavigator(
  {
    Home: { screen: Home },
    Locations: { screen: List },
    Map: { screen: Mapper }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#0053A1'
      }
    }
  }
);

const Root = createAppContainer(MainNavigator);

export default function() {
  const [loading, setLoading] = useState(true);
  // [state, dispatch]
  const [filter, setFilter] = useReducer(reducer, 'ALL');

  async function loadFonts() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });

    setLoading(false);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <Fragment>
      <Context.Provider value={{ filter, setFilter }}>
        <Container>
          <Header />
          <Root />
          <Footer style={{ alignItems: 'center', backgroundColor: '#0053A1' }}>
            <Text style={{ color: 'white' }}>Made by Owais Jamil in 2019</Text>
          </Footer>
        </Container>
      </Context.Provider>
    </Fragment>
  );
}
