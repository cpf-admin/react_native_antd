import React from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View, 
  TextInput, 
  Image, 
  Text, 
  FlatList, 
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import TouchableButton from '../../components/touchableButton'
import httpUtil from '../../../utils/httpUtil';
import Video from 'react-native-video';

const playTypeArray = [
  {
    iconName:'cycle',
    btnName:'循环播放'
  },
  {
    iconName:'creative-cloud',
    btnName:'随机播放'
  },
  {
    iconName:'minus',
    btnName:'单首播放'
  }
];

class SearchList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      inpValue: '',
      songList: [],
      songUrl: null,
      isPaused: false,
      playType: 0,
      songName: '',
      currentIndex: null

    };
  }
  searchMusicList = _.debounce((keyword) => {
    httpUtil.get(`https://c.y.qq.com/soso/fcgi-bin/client_search_cp?p=1&n=20&w=${keyword}&format=json`).then(res => {
    if (res.data && res.data.code === 0) {
        this.setState({
          songList: res.data.data.song.list
        })
      }
    })
  }, 500)

  getMusicUrl = (ctx) => {
    const { songmid, songName, index} = ctx;
    const that = this;
    httpUtil.get(`https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data=%7B%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%22358840384%22%2C%22songmid%22%3A%5B%22${songmid}%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%221443481947%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A%2218585073516%22%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D`).then(res => {
      if (res.data && res.data.code === 0) {
        let data = res.data.req_0.data;
        that.setState({
          songUrl: data.sip[0] + data.midurlinfo[0].purl,
          songName,
          currentIndex: Number(index)
        })
      }
    })
  }
  
  handlePlay() {
    this.setState({
      isPaused: !this.state.isPaused
    });
  }

  handlePlayPrev(){
    const { songList, currentIndex } = this.state;
    let _currentIndex = currentIndex ? Number(_.cloneDeep(currentIndex)) : 0;
    let ids = _currentIndex === 0 ? 0 : --_currentIndex;
    this.getMusicUrl({
      songmid: songList[ids].songmid,
      songName: songList[ids].songname,
      index: ids
    })
  }

  handlePlayNext(){
    const { songList, currentIndex } = this.state;
    let _currentIndex = currentIndex ? Number(_.cloneDeep(currentIndex)) : 0;
    let ids = _currentIndex >= songList.length ? songList.length : ++_currentIndex;
    this.getMusicUrl({
      songmid: songList[ids].songmid,
      songName: songList[ids].songname,
      index: ids
    })
  }

  handleChangePlayType(){
    const { playType } = this.state;
    this.setState({
      playType: playType >= 2 ? 0 : playType + 1
    })
  }

  render() {
    const {songList, inpValue, songUrl, isPaused, playType, songName, currentIndex} = this.state;
    const renderItem = (({ item, index }) => {
      return (
        <TouchableOpacity style={currentIndex === index ? styles.itemSelected : styles.item} onPress={() => {
          this.getMusicUrl({
            songmid:item.songmid, 
            songName: item.songname, 
            index
          });
        }}>
          <Text style={styles.itemName}>{item.songname}</Text>
          <Text style={styles.itemText}>{`歌手:${item.singer[0].name}`}</Text>
        </TouchableOpacity>
      );
    })
    return (
      <View style={{height: '100%'}}>
        <TextInput 
          style={styles.sInp} 
          value={inpValue}
          onChangeText={(val) => {
            this.setState({
              inpValue: val
            })
            this.searchMusicList(val);
          }}
        />
        {
          songUrl ? <Video
              style={styles.video}
              audioOnly
              playInBackground
              volume={0.5}
              paused={isPaused}
              source={{uri: songUrl}}   // Can be a URL or a local file.
              // onEnd={this.handleVideoEnd.bind(this)}
              // onLoad={this.handleVideoLoad.bind(this)}
              // onLoadStart={this.handleVideoLoadStart.bind(this)}
              // onTimedMetadata={this.handleVideoTime.bind(this)}
              // onProgress={this.handleVideoProgress.bind(this)}
              // onVideoError={this.err.bind(this)}
              // onError={this.handleVideoError.bind(this)}               // Callback when video cannot be loaded
            /> : null
        }
        
        <FlatList
          data={songList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <View style={styles.control}>
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
              {/* <TouchableButton
                onPress={this.handleChangePlayType.bind(this)}
                iconName={playTypeArray[playType].iconName}
                buttonName={playTypeArray[playType].btnName}
              /> */}
            </View> : null
          }
          
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: '#dfdfdf',
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
})

export default SearchList;

