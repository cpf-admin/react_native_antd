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
          topList: res.data.data.list 
        })
      }
    })
  }

  render() {
    const {topList} = this.state;
    const renderItem = (({ item, index }) => {
      return (
        <TouchableOpacity style={styles.albumItem} onPress={() => {
          this.props.navigation.navigate('Player', item)
        }}>
          <View style={styles.imgBox}>
            <Image style={styles.albumItemImg} source={{uri: item.albumimg}} />
          </View>
          <View>
            <Text style={styles.itemTitle}>{item.songname.length > 6 ? item.songname.substring(0, 6) + '...' : item.songname}</Text>
            <Text style={styles.itemAuthor}>{item.singer.name}</Text>
          </View>
        </TouchableOpacity>
      );
    })

    return (
      <View style={styles.container}>
        <Text>最新Top榜</Text>
        <FlatList
          style={styles.flatBox}
          numColumns={4}
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
    height: deviceH
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
    width: deviceW/4.5,
    height: 100,
  },
  imgBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  albumItemImg: {
    width: 60,
    height: 60,
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