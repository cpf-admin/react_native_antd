import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import httpUtil from '../../../../../utils/httpUtil';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

export default class TopList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      topList: [],
    }
  }
  componentDidMount() {
    this.getTopList();
  }

  getTopList() {
    httpUtil.get(`https://api.zsfmyz.top/music/top`).then(res => {
      if (res.data && res.data.code === '0') {
        this.setState({
          topList: res.data.data.list && res.data.data.list.length > 21 ? res.data.data.list.slice(0,21) : res.data.data.list
        })
      }
    })
  }

  render() {
    const {topList} = this.state;
    const renderItem = (({ item, index }) => {
      return (
        <TouchableOpacity style={styles.albumItem} onPress={() => {
          
        }}>
          <View style={styles.imgBox}>
            <Image style={styles.albumItemImg} source={{uri: item.albumimg}} />
          </View>
          
          <View>
            <Text style={styles.itemTitle}>{item.songname.length > 8 ? item.songname.substring(0, 7) + '...' : item.songname}</Text>
            <Text style={styles.itemAuthor}>{item.singer.name}</Text>
          </View>
        </TouchableOpacity>
      );
    })

    return (
      <View style={styles.container}>
        <Text>Top</Text>
        <FlatList
          style={styles.flatBox}
          numColumns={3}
          data={topList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 295
  },
  tInp: {
    padding: 3,
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 20,
    backgroundColor: '#dfdfdf',
    borderRadius: 20,
    fontSize: 14,
    color: '#666'
  },
  flatBox: {
    margin: 10,
  },
  albumItem: {
    width: deviceW/3.5,
    height: 120,
  },
  imgBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  albumItemImg: {
    width: 80,
    height: 80,
  },
  itemTitle:{
    fontSize: 12,
    textAlign: 'center'
  },
  itemAuthor: {
    fontSize: 12,
    textAlign: 'center'
  }
})