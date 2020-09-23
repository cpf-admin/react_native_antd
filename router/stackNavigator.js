//StackNavigator.js
import { createStackNavigator } from "react-navigation-stack";
import {LocaleConfig} from 'react-native-calendars';
import Menu from '../src/pages/calendars/screens/menu';
import Calendars from '../src/pages/calendars/screens/calendars';
import CalendarsList from '../src/pages/calendars/screens/calendarsList';
import DatepickerTem from '../src/pages/calendars/screens/datepicker';

LocaleConfig.locales['en'] = {
  formatAccessibilityLabel: 'dddd d \'of\' MMMM \'of\' yyyy',
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
  ],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};

LocaleConfig.defaultLocale = 'en';

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