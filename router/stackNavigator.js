//StackNavigator.js
import { createStackNavigator } from "react-navigation-stack";
import Menu from '../src/pages/calendars/screens/menu';
import Calendars from '../src/pages/calendars/screens/calendars';
import CalendarsList from '../src/pages/calendars/screens/calendarsList';
import DatepickerTem from '../src/pages/calendars/screens/datepicker';
import WeekCalendars from '../src/pages/calendars/screens/weekCalendars'

export default StackNavigator = createStackNavigator(
  {
    Menu:{
      screen: Menu,
      navigationOptions:{
        headerShown: false,
      }
    },
    Calendars:{
      screen: Calendars
    },
    CalendarsList:{
      screen: CalendarsList
    },
    DatepickerTem: {
      screen: DatepickerTem
    },
    WeekCalendars: {
      screen: WeekCalendars
    }
  },
  {
    initialRouteName: 'Menu', //默认显示底部路由
    defaultNavigationOptions: { // =>默认的路由全局样式配置
      // headerBackImage: <BackImage />, //=>自定义返回按钮
      headerStyle: {
        backgroundColor: '#1985EA',
        elevation: 0.5
      },
      headerTitleStyle: {
        color: '#fff',
      },
    }
  }
)
//这样我们App的一个基本路由框架就算基本完成，剩余的就是到App.js文件，把之前实例化的路由更改下就OK