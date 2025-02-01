import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/router/RootNavigator';
import {StatusBar} from 'react-native';
import {colors} from './src/theme/colors';
import {Provider} from 'react-redux';
import store from './src/store';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
const App = () => {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <StatusBar backgroundColor={colors.BLACK} barStyle="light-content" />
          <RootNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
