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
      songName: ''
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
  }

  handlePlayPrev(){

  }

  handlePlayNext(){
  }

  handleChangePlayType(){
  }

  

  handleVideoError(err) {
    console.log(err);
  }

  handleVideoEnd() {
    // this.props.onEnd();
  }

  handleVideoLoad() {
    console.log('load', this.state.songUrl)
  }

  handleVideoProgress(process) {
    // this.props.onProcess(process);
  }

  handleVideoTime() {
    console.log('onTimedMetadata')
  }

  handleVideoLoadStart() {
    console.log('loadStart')
  }

  err(err) {
    console.log(err)
  }

  render() {
    const {songList, inpValue, songUrl, isPaused, playType, songName} = this.state;
    const renderItem = (({ item }) => {
      return (
        <TouchableOpacity style={styles.item} onPress={() => {
          this.setState({
            songUrl: `https://app.pd.nf.migu.cn/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=HQ&netType=00&userId=15548614588710179085069&ua=Android_migu&version=5.1&copyrightId=0&contentId=${item.contentId}&resourceType=2&channel=0`,
            songName: item.name
          })
        }}>
          <Image  style={styles.songImg} source={require('../../assets/img/aed2a013f4bebb994cc9de0aa93e26ae.png')} />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemText}>{`作者:${item.singers[0].name}`}</Text>
        </TouchableOpacity>
      );
    })
    return (
      <View style={{height: '100vh'}}>
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
              onEnd={this.handleVideoEnd.bind(this)}
              onLoad={this.handleVideoLoad.bind(this)}
              onLoadStart={this.handleVideoLoadStart.bind(this)}
              onTimedMetadata={this.handleVideoTime.bind(this)}
              onProgress={this.handleVideoProgress.bind(this)}
              onVideoError={this.err.bind(this)}
              onError={this.handleVideoError.bind(this)}               // Callback when video cannot be loaded
            /> : null
        }
        <View style={styles.control}>
          <View style={styles.songName}>
            <Text>{songName}</Text>
          </View>
          <View style={styles.btnWarp}>
            
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
            <TouchableButton
              onPress={this.handleChangePlayType.bind(this)}
              iconName={playTypeArray[playType].iconName}
              buttonName={playTypeArray[playType].btnName}
            />
          </View>
        </View>
        
        
        <FlatList
          data={songList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        
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
  songImg: {
    width: 40,
    height: 40
  },
  itemName: {
    flex: 1,
    marginLeft: 20,
    padding: 5,
    fontSize: 16
  },
  itemText: {
    flex: 1,
    marginLeft: 20,
    padding: 5,
  },
  songName: {
    padding: 8,
    textAlign: 'center',    
  },
  btnWarp:{
    flexDirection:'row'
  },
  control:{
    position: 'relative',
    left: 0,
    bottom: 0
  }
})

export default SearchList;

