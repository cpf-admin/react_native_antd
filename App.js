import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Provider} from 'mobx-react'
import DataStore from './src/store';

import { createAppContainer } from 'react-navigation'; //路由容器实例化方法
import StackNavigator from './router/stackNavigator';
const Navigator = createAppContainer(StackNavigator);
const stores = new DataStore();
export default class App extends Component {
  render() {
    return (
      <Provider stores={stores}>
        <Navigator/>
      </Provider>
         
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
