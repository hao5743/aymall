import React, { Component } from 'react';
import {  AppRegistry  } from 'react-native';

import { Provider } from 'react-redux';
import configureStore from './app/store/configure-store';
import App from './app/App';

let store = configureStore();
console.log(store.getState());

class Aymall extends Component {
  render() {
    return (
        <Provider store={store}>
          <App />
        </Provider>
    );
  }
}

AppRegistry.registerComponent('aymall', () => Aymall);
