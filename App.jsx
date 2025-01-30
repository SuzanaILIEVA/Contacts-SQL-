import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/router/RootNavigator';
import {StatusBar} from 'react-native';
import {colors} from './src/theme/colors';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.BLACK} barStyle="light-content" />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
