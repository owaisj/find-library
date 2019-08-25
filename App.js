import React, { Component } from 'react';
import { StatusBar, Text, View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Subtitle,
  Body,
  Left,
  Right,
  Content,
  Footer
} from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

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
      <Container style={{ paddingTop: StatusBar.currentHeight }}>
        <Header>
          <Left />
          <Body>
            <Title>Library Hours</Title>
            <Subtitle>Austin Public Library</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 15
          }}
        >
          <Text>An app to view the nearest open library</Text>
          <View style={{ alignItems: 'center' }}>
            <Text>Example Library Content Card</Text>
            <Text>Name</Text>
            <Text>Address</Text>
            <Text>Hours</Text>
          </View>
          <Text>Multiple cards will be displayed here</Text>
        </Content>
        <Footer style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Made by Owais Jamil 2019</Text>
        </Footer>
      </Container>
    );
  }
}

// React Navigation

// import {
//   createMaterialTopTabNavigator,
//   createAppContainer
// } from 'react-navigation';
// import Home from './screens/Home';
// import List from './screens/List';

// const MainNavigator = createMaterialTopTabNavigator({
//   Home: { screen: Home },
//   List: { screen: List }
// });
// const App = createAppContainer(MainNavigator);
// export default App;
