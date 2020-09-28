import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';

const dataList = [
  {
    'name': '喜欢的音乐',
    'router': 'LoveList'
  },
  {
    'name': '本地音乐',
    'router': ''
  },
  {
    'name': '歌单',
    'router': ''
  }
]

export default class My extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }
  
  render() {
    const renderItem = (({ item, index }) => {
      return (
        <TouchableOpacity style={styles.flatItem} onPress={() => {
          if (item.router) {
            this.props.navigation.navigate(item.router);
          }
        }}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Image style={styles.arrow} source={require('../../assets/icon/icon-arrow.png')} />
        </TouchableOpacity>
      );
    })
    return (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image style={styles.logo} source={require('../../assets/img/qq-logo.png')} />
          <Text style={styles.userName}>夏天的风</Text>
        </View>
        <FlatList
          data={dataList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // backgroundColor: '#bfbfbf',
  },
  userInfo: {
    flexDirection: 'row',
    padding: 20,
    // borderBottomWidth: 1,
    // borderColor: '#bfbfbf',
    marginBottom: 20
  },
  logo: {
    width: 60,
    height: 60
  },
  userName: {
    height: 60,
    paddingTop: 30,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold"
  },
  flatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderColor: '#bfbfbf',
    borderBottomWidth: 1,
  },
  arrow: {
    width: 20,
    height: 20,
  }
});
