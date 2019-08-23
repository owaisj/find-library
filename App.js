// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation';
import Home from './screens/Home';
import List from './screens/List';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Library Hours</Text>
//     </View>
//   );
// }

const MainNavigator = createMaterialTopTabNavigator({
  Home: { screen: Home },
  List: { screen: List }
});

const App = createAppContainer(MainNavigator);

export default App;
