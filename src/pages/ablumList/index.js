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

const playUrl = require('../../assets/icon/icon-play.png');
const loveUrl = require('../../assets/icon/icon-love-white.png');


@inject('stores')
@observer
class AblumList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      inpValue: '',
      songList: [],
      songUrl: null,
      isPaused: false,
      songName: '',
      currentIndex: null,
      loveObj: null
    };
  }
  componentDidMount() {
    let params = this.props.navigation.state.params;
    if (params) {
      this.searchMusicList(params.name);
    }
  }
  searchMusicList = _.debounce((keyword) => {
    httpUtil.get(`https://api.zsfmyz.top/music/list?p=1&n=20&w=${keyword}`).then(res => {
    if (res.data && res.data.code === "0") {
        this.setState({
          songList: res.data.data.list
        })
      }
    })
  }, 500)

  // getMusicUrl = (ctx) => {
  //   const { songmid, songName, index} = ctx;
  //   console.log(songmid);
  //   const that = this;
  //   httpUtil.get(`https://api.zsfmyz.top/music/song?songmid=${songmid}&guid=126548448`).then(res => {
  //   if (res.data && res.data.code === '0') {
  //       let data = res.data.data;
  //       that.setState({
  //         songUrl: data.musicUrl,
  //         songName,
  //         currentIndex: Number(index)
  //       })
  //     }
  //   })
  // }
  
  // handlePlay() {
  //   this.setState({
  //     isPaused: !this.state.isPaused
  //   });
  // }

  // handlePlayPrev(){
  //   const { songList, currentIndex } = this.state;
  //   let _currentIndex = currentIndex ? Number(_.cloneDeep(currentIndex)) : 0;
  //   let ids = _currentIndex === 0 ? 0 : --_currentIndex;
  //   if (songList[ids]) {
  //     this.getMusicUrl({
  //       songmid: songList[ids].songmid,
  //       songName: songList[ids].songname,
  //       index: ids
  //     })
  //   }
  // }

  // handlePlayNext(){
  //   const { songList, currentIndex } = this.state;
  //   let _currentIndex = currentIndex ? Number(_.cloneDeep(currentIndex)) : 0;
  //   let ids = _currentIndex >= songList.length ? songList.length : ++_currentIndex;
  //   if (songList[ids]) {
  //     this.getMusicUrl({
  //       songmid: songList[ids].songmid,
  //       songName: songList[ids].songname,
  //       index: ids
  //     })
  //   }
  // }

  render() {
    const {songList, loveObj} = this.state;
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
              <Image style={styles.controlIcon} source={playUrl}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  loveObj: {
                    ...loveObj,
                    [index]: loveObj && loveObj[index] !== undefined ? !loveObj[index] : true
                  }
                }, () => {
                  let _loveSongList = _.cloneDeep(this.props.stores.loveSongList);
                  if (this.state.loveObj[index] === false) {
                    _loveSongList.forEach((_item, _index) => {
                      if (_item.songmid === item.songmid) {
                        _loveSongList.splice(_index, 1);
                      }
                    })
                  } else {
                    _loveSongList = _.uniqWith([
                      ...this.props.stores.loveSongList,
                      item
                    ], _.isEqual)
                  }
                  AsyncStorage.setItem('loveList', JSON.stringify(_loveSongList));
                  this.props.stores.saveLoveSongList(_loveSongList);
                })
              }}
            >
              <Image style={styles.controlIcon} source={ loveObj && loveObj[index] ? require('../../assets/icon/icon-love.png') : require('../../assets/icon/icon-love-white.png')}/>
            </TouchableOpacity>
            
          </View>
        </View>
      );
    })
    return (
      <View style={styles.container}>
        {/* {
          songUrl ? <Video
              style={styles.video}
              audioOnly
              playInBackground
              volume={0.5}
              paused={isPaused}
              source={{uri: songUrl}}   // Can be a URL or a local file.
            /> : null
        } */}
        
        <FlatList
          data={songList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        {/* <View style={styles.control}>
          {
            songUrl ? <View >
              <Text style={styles.songName}>{songName}</Text>
            </View> : null
          }
          {
            songUrl ? <View style={styles.btnWarp}>
              <TouchableButton
                onPress={this.handlePlayPrev.bind(this)}
                iconName={ 'controller-jump-to-start'}
                buttonName='上一首'
              />
              <TouchableButton
                onPress={this.handlePlay.bind(this)}
                iconName={!isPaused ? 'controller-paus' : 'controller-play'}
                buttonName={!isPaused ? '暂停' : '播放'}
              />
              <TouchableButton
                onPress={this.handlePlayNext.bind(this)}
                iconName={ 'controller-next'}
                buttonName='下一首'
              />
            </View> : null
          }
          
        </View> */}
        
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

