import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';
import _ from 'lodash';
import httpUtil from '../../../../../utils/httpUtil';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

export default class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      albumList: [],
      inputValue: ''
    }
  }
  componentDidMount() {
    this.getAlbumList('');
  }

  getAlbumList(keyword) {
    httpUtil.get(`https://c.y.qq.com/soso/fcgi-bin/client_search_cp?p=1&n=9&w=${keyword || '周杰伦'}&format=json&t=8`).then(res => {
      if (res.data && res.data.code === 0) {
        let data = res.data.data.album;
        this.setState({
          albumList: data.list
        })
      }
    })
  }

  searchAblumList = _.debounce((keyword) => {
    this.getAlbumList(keyword);
  }, 500)

  render() {
    const {albumList, inputValue} = this.state;
    const renderItem = (({ item, index }) => {
      return (
        <TouchableOpacity style={styles.albumItem} onPress={() => {
          
        }}>
          <View style={styles.imgBox}>
            <Image style={styles.albumItemImg} source={{uri: item.albumPic}} />
          </View>
          
          <View>
            <Text style={styles.itemTitle}>{item.albumName.length > 10 ? item.albumName.substring(0, 9) + '...' : item.albumName}</Text>
            <Text style={styles.itemAuthor}>{item.singerName}</Text>
          </View>
        </TouchableOpacity>
      );
    })

    return (
      <View style={styles.container}>
        <Text>专辑/{inputValue}</Text>
        <TextInput 
          style={styles.tInp}
          placeholder='可盐可甜的他/她'
          value={inputValue}
          onChangeText={(val) => {
            this.setState({
              inputValue: val
            })
            this.searchAblumList(val);
          }}
        />
        <FlatList
          style={styles.flatBox}
          numColumns={3}
          data={albumList}
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