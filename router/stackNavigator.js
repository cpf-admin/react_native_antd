//StackNavigator.js
import { createStackNavigator } from "react-navigation-stack";
import BottomNavigator from './bottomTabBar';
import My from '../src/pages/my';
import SearchList from '../src/pages/searchList';
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
    SearchList: {
      screen: SearchList,
      navigationOptions: {
        title: '搜索列表'
      }
    }
  },
  {
    initialRouteName: 'SearchList', //默认显示底部路由
    defaultNavigationOptions: { // =>默认的路由全局样式配置
      // headerBackImage: <BackImage />, //=>自定义返回按钮
      headerStyle: {
        backgroundColor: '#1985EA',
        elevation: 0.5
      },
      headerTitleStyle: {
        color: '#fff',
        // textAlign: "center", //用于android 机型标题居中显示
        // flex: 1
      },
    }
  }
)
//这样我们App的一个基本路由框架就算基本完成，剩余的就是到App.js文件，把之前实例化的路由更改下就OK