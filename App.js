import React, {Component} from 'react';
import { StyleSheet} from 'react-native';

import { createAppContainer } from 'react-navigation'; //路由容器实例化方法
import StackNavigator from './router/stackNavigator';
const Navigator = createAppContainer(StackNavigator);
export default class App extends Component {
  render() {
    return (
         <Navigator />
    );
  }
};




// import Life from './src/pages/life';
// import Koubei from './src/pages/koubei';
// import My from './src/pages/my';
// import Friend from './src/pages/friend';

// export default class App extends React.Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       selectedTab: 'redTab',
//     };
//   }

//   onChangeTab(tabName) {
//     this.setState({
//       selectedTab: tabName,
//     });
//   }

//   render() {
//     return (
//       <TabBar
//         unselectedTintColor="#949494"
//         tintColor="#33A3F4"
//         barTintColor="#f5f5f5"
//       >
//         <TabBar.Item
//           title="Life"
//           icon={<Icon name="home" />}
//           selected={this.state.selectedTab === 'blueTab'}
//           onPress={() => this.onChangeTab('blueTab')}
//         >
//           <Life />
//         </TabBar.Item>
//         <TabBar.Item
//           icon={<Icon name="ordered-list" />}
//           title="Koubei"
//           badge={2}
//           selected={this.state.selectedTab === 'redTab'}
//           onPress={() => this.onChangeTab('redTab')}
//         >
//           <Koubei />
//         </TabBar.Item>
//         <TabBar.Item
//           icon={<Icon name="like" />}
//           title="Friend"
//           selected={this.state.selectedTab === 'greenTab'}
//           onPress={() => this.onChangeTab('greenTab')}
//         >
//           <Friend/>
//         </TabBar.Item>
//         <TabBar.Item
//           icon={<Icon name="user" />}
//           title="My"
//           selected={this.state.selectedTab === 'yellowTab'}
//           onPress={() => this.onChangeTab('yellowTab')}
//         >
//           <My/>
//         </TabBar.Item>
//       </TabBar>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
