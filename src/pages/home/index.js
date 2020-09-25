import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  Alert, 
  Button, 
  TextInput,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import Album from './components/album';
import Top from './components/top';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <TouchableOpacity style={styles.sInp} onPress={() => {
          this.props.navigation.navigate('SearchList');
        }}>
          <Text>搜搜看哦~</Text>
        </TouchableOpacity>
        <Album />
        <Top />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sInp: {
    padding: 6,
    margin: 10,
    paddingLeft: 20,
    backgroundColor: '#dfdfdf',
    borderRadius: 20,
    fontSize: 14,
    color: '#666'
  },
})