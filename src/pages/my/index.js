import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {WingBlank, WhiteSpace} from '@ant-design/react-native';

export default class My extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }
  
  render() {
    return (
      <View>
        <WhiteSpace />
        <WingBlank style={styles.wing} size='lg'>
            <Text>2123</Text>
        </WingBlank>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wing: {
    backgroundColor: '#dfdfdf',
  }
});
