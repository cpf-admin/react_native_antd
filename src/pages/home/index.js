import React from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, Button, TextInput} from 'react-native';
import _ from 'lodash';

const styles = StyleSheet.create({
  
  sInp: {
    height: 35,
    borderRadius: 5,
    borderColor: '#bfbfbf',
    borderWidth: 1,
    margin: 10,

  },
})

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <TextInput style={styles.sInp} onFocus={() => {
          this.props.navigation.navigate('SearchList');
        }}/>

      </View>
       
    );
  }
}