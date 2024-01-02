/* eslint-disable prettier/prettier */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
import { PaperProvider } from 'react-native-paper';
console.disableYellowBox = true;

const RNRedux = () => (
    // <AntdProvider>


      <Provider store = { store }>
       <PaperProvider>

        <App />
       </PaperProvider>
      </Provider>


    )
    AppRegistry.registerComponent(appName, () => RNRedux);
