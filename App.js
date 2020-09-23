import React, {Component} from 'react';

import { createAppContainer } from 'react-navigation'; //路由容器实例化方法
import StackNavigator from './router/stackNavigator';
import DrawerNavigator from './router/drawerNavigator';
const Navigator = createAppContainer(StackNavigator);
export default class App extends Component {
  render() {
    return (
         <Navigator />
    );
  }
};

