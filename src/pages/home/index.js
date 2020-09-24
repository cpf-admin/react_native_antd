import React from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, Button, TextInput} from 'react-native';
import _ from 'lodash';

const styles = StyleSheet.create({
  searchbox: {
    justifyContent: 'space-between',
  },
  sInp: {
    flex: 4,
    backgroundColor: 'red',
  },
  sbtn: {
    flex: 1,
  }
})

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View>
        <View style={styles.searchbox}>
          <TextInput style={styles.sInp}/>
          <Button title='搜索' style={styles.sbtn}>搜索</Button>
        </View>



      </View>
       
    );
  }
}