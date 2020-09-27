import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import AnimateImgCom from '../../components/animateImg';
import Video from 'react-native-video';
import httpUtil from '../../../utils/httpUtil';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;


export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      lyric: '',
      lyricArr: [],
      songUrl: null,
      musicInfo: {}
    }
  }
  componentDidMount() {
    let params = this.props.navigation.state.params;
    if (params) {
      this.getMusicInfo(params.songmid);
      this.getLyric(params.songmid);
      this.setState({
        musicInfo: params
      });
    }
  }

  getMusicInfo(songmid) {
    const that = this;
    httpUtil.get(`https://api.zsfmyz.top/music/song?songmid=${songmid}&guid=126548448`).then(res => {
    if (res.data && res.data.code === '0') {
        let data = res.data.data;
        that.setState({
          songUrl: data.musicUrl,
        })
      }
    })
  }

  getLyric(songmid) {
    const that = this;
    httpUtil.get(` https://api.zsfmyz.top/music/lyric?songmid=${songmid}`).then(res => {
    if (res.data && res.data.code === '0') {
        let data = res.data.data;
        let lyricArr = [];
        data.lyric.split(/\n/).forEach(item => {
          if (item.split(']')[1]) {
            lyricArr.push(item.split(']')[1]);
          }
        })
        that.setState({
          lyric: data.lyric,
          lyricArr
        })
      }
    })
  }

  render() {
    const {musicInfo, lyricArr, songUrl} = this.state;

    const renderItem = (({ item }) => {
      return (
        <View>
          <Text style={styles.lyricItem}>{item}</Text>
        </View>
      );
    })
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{musicInfo.songname}</Text>
        <AnimateImgCom />
        <View style={styles.lyricContainer}>
          <FlatList
            data={lyricArr}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        </View>
        {
          songUrl ? <Video
              style={styles.video}
              audioOnly
              playInBackground
              volume={0.5}
              source={{uri: songUrl}}   // Can be a URL or a local file.
            /> : null
        }
      </View>
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: deviceH,
    backgroundColor: '#30064e'
  },
  title: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    color: '#fff'
  },
  imgBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: 100,
    height: 100,
    margin: 20
  },
  animat: {
    height: 200,
    alignItems:'center',
    justifyContent:'center',
  },
  circle:{
    // position:'absolute',
    width: 100,
    height: 100
  },
  lyricContainer: {
    height: 250,
  },
  lyricItem: {
    color: '#fff',
    textAlign: 'center',
    padding: 5
  }

})