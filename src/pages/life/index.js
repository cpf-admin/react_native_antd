import React from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from '@ant-design/react-native';
import DrawerEle from '../../components/drawer';

export default class Life extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <>
        {/* <DrawerEle /> */}
        <Button onPress={() => {
          this.props.navigation.navigate('My');
        }}>点击</Button>
      </>
       
    );
  }
}