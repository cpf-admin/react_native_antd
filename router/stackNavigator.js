//StackNavigator.js
import { createStackNavigator } from "react-navigation-stack";
import BottomNavigator from './bottomTabBar';
import My from '../src/pages/my';
import SearchList from '../src/pages/searchList';
import AblumList from '../src/pages/ablumList';
import LoveList from '../src/pages/loveList';
import Player from '../src/pages/player';
//类似一个嵌套路由，把底部路由包裹在Stack中
export default StackNavigator = createStackNavigator(
  {
    BottomNavigator:{
      screen: BottomNavigator,
      navigationOptions: {
        headerShown: false,
      }
    },
    My:{
      screen: My
    },
    Player:{
      screen: Player
    },
    SearchList: {
      screen: SearchList,
      navigationOptions: {
        title: '搜索列表'
      }
    },
    AblumList: {
      screen: AblumList,
      navigationOptions: {
        title: '专辑歌曲'
      }
    },
    LoveList: {
      screen: LoveList,
      navigationOptions: {
        title: '喜欢的音乐'
      }
    },
  },
  {
    initialRouteName: 'BottomNavigator', //默认显示底部路由
    defaultNavigationOptions: { // =>默认的路由全局样式配置
      // headerBackImage: <BackImage />, //=>自定义返回按钮
      headerStyle: {
        backgroundColor: '#2b6292',
        elevation: 0.5
      },
      headerTitleStyle: {
        color: '#fff',
      },
    }
  }
)
//这样我们App的一个基本路由框架就算基本完成，剩余的就是到App.js文件，把之前实例化的路由更改下就OK