import 'react-native-gesture-handler';
import React from 'react';
import Route from './src/app/navigations/Route';
import { AuthContentApi } from './src/app/api/AuthContentApi';
import { AppContentApi } from './src/app/api/AppContentApi';
import {enableLatestRenderer} from 'react-native-maps';
enableLatestRenderer();
const App = () => {
  return (
    <AuthContentApi>
      <AppContentApi>
        <Route />
      </AppContentApi>
    </AuthContentApi>
  );
}



export default App;
