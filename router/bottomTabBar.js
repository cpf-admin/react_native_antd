//BottomTabBar.js
import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {StyleSheet, Image} from 'react-native';


import Home from '../src/pages/home';
import Ablum from '../src/pages/ablumn';
import Search from '../src/pages/searchList';
import My from '../src/pages/my';
// import Friend from '../src/pages/friend';

//路由所需要用到的图片，选中跟未选中
const IndexSelected = require("../src/assets/icon/icon-home.png");
const IndexIcon = require("../src/assets/icon/icon-home-white.png");
const SystemSelected = require("../src/assets/icon/icon-qq.png");
const SystemIcon = require("../src/assets/icon/icon-qq-white.png");
const MineSelected = require("../src/assets/icon/icon-my.png");
const MineIcon = require("../src/assets/icon/icon-my-white.png");
const SearchSelected = require("../src/assets/icon/icon-search.png");
const SearchIcon = require("../src/assets/icon/icon-search-white.png");

const styles = StyleSheet.create({
  tabbarImage: {
    width: 20,
    height: 20
  }
})

export default BottomNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      title: '最新',
      tabBarIcon: (({ focused }) => {
        return (
          <Image
            source={focused ? IndexSelected : IndexIcon}
            style={styles.tabbarImage}
          />
        )
      }),
    })
  },
  Ablum: {
    screen: Ablum,
    navigationOptions: () => ({
      title: '专辑',
      tabBarIcon: (({ focused }) => {
        return (
          <Image
            source={focused ? SystemSelected : SystemIcon}
            style={styles.tabbarImage}
          />
        )
      }),
    })
  },
  Search: {
    screen: Search,
    navigationOptions: () => ({
      title: '搜索',
      tabBarIcon: (({ focused }) => {
        return (
          <Image
            source={focused ? SearchSelected : SearchIcon}
            style={styles.tabbarImage}
          />
        )
      }),
    })
  },
  My: {
    screen: My,
    navigationOptions: () => ({
      title: '我的',
      tabBarIcon: (({ focused }) => {
        return (
          <Image
            source={focused ? MineSelected : MineIcon}
            style={styles.tabbarImage}
          />
        )
      }),
    })
  },
},
  {
    initialRouteName: 'Home', //默认显示底部导航的哪个页面
    tabBarOptions: {
      showIcon: true, //是否显示Icon
      activeTintColor: '#1985EA', //底部选中颜色
      inactiveBackgroundColor: '#bfbfbf'
    }
  });
//这样底部的图标也配置完成了

BottomNavigator.navigationOptions = ({navigation})=>{
  //如果我们要对底部导航进行一些动态的配置，我们可以这样操作
  //BottomNavigator是当前我们默认导出的component
  //navigation里面我们可以得到当前路由的名称等等之类的一些东西
  //然后我们可以根据navigation里面拿到的东西进行判断，以获得不同页面不同的展示效果
  //最后return
  return {
  //你要返回的东西
  }
}