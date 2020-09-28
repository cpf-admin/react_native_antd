import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';
import _ from 'lodash';
import { observer, inject } from 'mobx-react'
import TouchableButton from '../../components/touchableButton'
import httpUtil from '../../../utils/httpUtil';
import Video from 'react-native-video';

@inject('stores')
@observer
class AblumList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loveList: []
    };
  }
  componentDidMount() {
    let loveSongList = this.props.stores.loveSongList;
    console.log(loveSongList);
    if (loveSongList) {
      this.setState({
        loveList: loveSongList
      })
    }
  }

  render() {
    const {loveList} = this.state;
    const renderItem = (({ item, index }) => {
      return (
        <View style={styles.item}>
          <Text style={styles.itemName}>{item.songname}</Text>
          <Text style={styles.itemText}>{item.singer.name}</Text>
          <View style={styles.iconBox}>
            <TouchableOpacity 
              onPress={() => {
                this.props.navigation.navigate('Player', item)
              }}
            >
              <Image style={styles.controlIcon} source={require('../../assets/icon/icon-play.png')}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let _loveList = _.cloneDeep(this.state.loveList);
                _loveList.forEach((_item, _index) => {
                  if (_item.songmid === item.songmid) {
                    _loveList.splice(_index, 1);
                  }
                })
                this.setState({
                  loveList: _loveList
                })
                AsyncStorage.setItem('loveList', JSON.stringify(_loveList));
                this.props.stores.saveLoveSongList(_loveList);
              }}
            >
              <Image style={styles.controlIcon} source={require('../../assets/icon/icon-del.png')}/>
            </TouchableOpacity>
            
          </View>
        </View>
      );
    })
    return (
      <View style={styles.container}>
        <FlatList
          data={loveList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#dfdfdf',
  },
  sInp: {
    height: 35,
    borderRadius: 5,
    borderColor: '#bfbfbf',
    borderWidth: 1,
    margin: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 5,
    fontSize: 14
  },
  itemSelected: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginVertical: 4,
    marginHorizontal: 8,
    backgroundColor: '#b78d22',
    borderRadius: 5,
    fontSize: 14
  },
  songImg: {
    width: 40,
    height: 40
  },
  itemName: {
    flex: 1,
    marginLeft: 20,
    padding: 5,
    fontSize: 16,
  },
  itemText: {
    flex: 1,
    marginLeft: 20,
    padding: 5,
  },
  songName: {
    padding: 5,
    textAlign: 'center',    
  },
  btnWarp:{
    flexDirection:'row',
  },
  control:{
    position: 'relative',
    left: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#bfbfbf',
  },
  iconBox: {
    width: 80,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlIcon: {
    width: 24,
    height: 24
  }
})

export default AblumList;

