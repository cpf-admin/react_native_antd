import React from 'react';
import {StyleSheet, Text } from 'react-native';
import { Button, Drawer} from '@ant-design/react-native';

export default class Life extends React.Component {
  constructor() {
    super(...arguments);
  }
  render() {
    const sidebar = (
      <Text>12312321</Text>
    );
    return (
      <Drawer
        sidebar={sidebar}
        position="left"
        open={false}
        drawerRef={el => (this.drawer = el)}
        drawerBackgroundColor="#ccc"
      >
        <Button onPress={() => this.drawer && this.drawer.openDrawer()}>
          Open drawer
        </Button>
      </Drawer>
    );
  }
}