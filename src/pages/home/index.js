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
      </View>
       
    );
  }
}

const styles = StyleSheet.create({
  sInp: {
    borderRadius: 10,
    borderColor: '#bfbfbf',
    borderWidth: 1,
    margin: 10,
    padding: 5,
    paddingLeft: 15
  },
})