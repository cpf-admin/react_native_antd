//BottomTabBar.js
import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {StyleSheet, Image} from 'react-native';


import Life from '../src/pages/life';
import Koubei from '../src/pages/koubei';
import Friend from '../src/pages/friend';

//路由所需要用到的图片，选中跟未选中
const IndexSelected = require("../src/assets/icon/icon-email.png");
const IndexIcon = require("../src/assets/icon/icon-iphone.png");
const SystemSelected = require("../src/assets/icon/icon-qq.png");
const SystemIcon = require("../src/assets/icon/icon-weixin.png");
const MineSelected = require("../src/assets/icon/logo-qq-broswer.png");
const MineIcon = require("../src/assets/icon/logo-qq-music.png");

const styles = StyleSheet.create({
  tabbarImage: {
    width: 20,
    height: 20
  }
})

export default BottomNavigator = createBottomTabNavigator({
  Life: {
    screen: Life,
    navigationOptions: () => ({
      title: '生活',
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
  Koubei: {
    screen: Koubei,
    navigationOptions: () => ({
      title: '口碑',
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
  Friend: {
    screen: Friend,
    navigationOptions: () => ({
      title: '朋友',
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
    initialRouteName: 'Life', //默认显示底部导航的哪个页面
    tabBarOptions: {
      showIcon: true, //是否显示Icon
      activeTintColor: '#1985EA' //底部选中颜色
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