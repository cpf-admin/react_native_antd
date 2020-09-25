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
function getMusicUrl(contentId) {
  return `https://app.pd.nf.migu.cn/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=HQ&netType=00&userId=15548614588710179085069&ua=Android_migu&version=5.1&copyrightId=0&contentId=${contentId}&resourceType=2&channel=0`
}

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
    httpUtil.get(`https://pd.musicapp.migu.cn/MIGUM3.0/v1.0/content/search_all.do?&ua=Android_migu&version=5.0.1&text=${keyword}&pageNo=1&pageSize=100&searchSwitch={"song":1,"album":0,"singer":0,"tagSong":0,"mvSong":0,"songlist":0,"bestShow":1}`).then(res => {
      if (res.data && res.data.code === '000000') {
        this.setState({
          songList: res.data.songResultData.result
        })
      }
    })
  }, 500)

  
  handlePlay() {
    this.setState({
      isPaused: !this.state.isPaused
    });
  }

  handlePlayPrev(){
    const { songList, currentIndex } = this.state;
    let _currentIndex = _.cloneDeep(currentIndex);
    let ids = _currentIndex === 0 ? 0 : --_currentIndex;
    this.setState({
      songUrl: getMusicUrl(songList[ids].contentId),
      songName: songList[ids].name,
      currentIndex: ids
    })
  }

  handlePlayNext(){
    const { songList, currentIndex } = this.state;
    let _currentIndex = _.cloneDeep(currentIndex);
    let ids = _currentIndex >= songList.length ? songList.length : ++_currentIndex;
    this.setState({
      songUrl: getMusicUrl(songList[ids].contentId),
      songName: songList[ids].name,
      currentIndex: ids
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
          this.setState({
            songUrl: getMusicUrl(item.contentId),
            songName: item.name,
            currentIndex: index
          })
        }}>
          <Image  style={styles.songImg} source={require('../../assets/img/aed2a013f4bebb994cc9de0aa93e26ae.png')} />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemText}>{`作者:${item.singers[0].name}`}</Text>
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
    backgroundColor: '#bfbfbf',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemSelected: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#b78d22',
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

