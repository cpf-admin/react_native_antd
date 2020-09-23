//StackNavigator.js
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerDatepicker from '../src/pages/calendars/screens/drawerDatepicker';

export default DrawerNavigator = createDrawerNavigator(
  {
    DrawerDatepicker:{
      screen: DrawerDatepicker,
      navigationOptions:{
        headerShown: false,
      }
    },
  }
)
//这样我们App的一个基本路由框架就算基本完成，剩余的就是到App.js文件，把之前实例化的路由更改下就OK