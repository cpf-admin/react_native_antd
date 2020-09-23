
import { Dimensions } from "react-native";
import {createDrawerNavigator} from "react-navigation-drawer";
import DrawerDatepicker from '../src/pages/calendars/screens/drawerDatepicker';
let width = Dimensions.get('window').width;

export default DrawerNavigator = createDrawerNavigator(
  {
    DrawerDatepicker:{
      screen: DrawerDatepicker,
    },
  },{
    initialRouteName: 'StackNavigator',
    drawerWidth: width * 0.7,
    drawerPosition: 'left', 
    useNativeAnimations: true,   
  }
)
//这样我们App的一个基本路由框架就算基本完成，剩余的就是到App.js文件，把之前实例化的路由更改下就OK