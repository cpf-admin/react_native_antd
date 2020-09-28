import {observable, action} from 'mobx';
import {AsyncStorage} from 'react-native';
import _ from 'lodash';

import Toast from 'react-native-root-toast';

class DataStore {
  @observable musicCollectList = []; // 歌集列表,用于首页展示
  @observable songsList = []; // songsList组件的音乐列表
  @observable loveSongList = []; //喜欢的歌曲列表

  constructor() {
    console.log('store start');
  }

  // 页面首次加载时初始化
  init = async () => {
    const musicCollectList = await AsyncStorage.getItem('musicCollectList');
    this.musicCollectList = musicCollectList ? JSON.parse(musicCollectList) :[];
  };

  @action
  saveLoveSongList = async (list) => {
    let loveList = await AsyncStorage.getItem('loveList');
    loveList = loveList ? JSON.parse(loveList) : [];
    let _list = _.uniqWith([
      ...loveList,
      ...list
    ], _.isEqual);
    this.loveSongList = _list;
    AsyncStorage.setItem('loveList', JSON.stringify(_list));
  }

  @action
  saveSongsList(list) {
    this.songsList = [...this.songsList, ...list];
    this.isSearch = false;
  }

  // 上一首播放完毕,播放下一首
  @action
  handleNextMusic = () => {
    if(this.playType === 2){
      // this.process = 0;
      this.uniquePlayer.seek(0);
      console.log(this.currentMusic);
    }else{
      this.handlePlayPrevNextMusic('next')
    }
    // this.currentIndex++;
    // this.currentMusic = this.songsList[this.currentIndex];
  };

  // 点击播放按钮
  @action
  handlePlayMusic = () => {
    // 如果已经播放过了 并且是暂停状态
    if (this.process !== 0 && this.isPaused) {
      this.isPaused = false;
      this.uniquePlayer.seek(this.process.currentTime);
      return
    }
    // 如果是在播放状态
    if (!this.isPaused) {
      this.isPaused = true;
      return
    }
    // 第一次点击播放全部
    this.currentMusic = this.songsList[0];
    this.currentIndex = 0;
    this.process = 0;
    this.isPaused = false;
    console.log(this.currentMusic);
    this.resetCurrentMusic();
  };

  // 处理上一首,下一首共用函数
  handlePlayPrevNextMusic(type){
    // 随机播放
    if(this.playType === 1){
      this.currentIndex = Math.floor(Math.random() * this.songsList.length);
    }
    // 循环播放 或者 单首播放
    if(this.playType === 0 || this.playType === 2){
      if(type === 'prev'){
        this.currentIndex = this.currentIndex === 0 ? 0 : this.currentIndex - 1;
      }else{
        this.currentIndex = this.currentIndex === this.songsList.length ? 0 :this.currentIndex + 1;
      }
    }
    this.process = {};
    this.isPaused = false;
    this.currentMusic = this.songsList[this.currentIndex];
    console.log(this.currentIndex);
    this.resetCurrentMusic();
  }

  handleChangePlayType(){
    if(this.playType === 2){
      this.playType = 0;
      return
    }
    this.playType++;
  }

  // 如果没走进度 则说明该音乐不能播放,跳到下一首音乐
  resetCurrentMusic() {
    setTimeout(() => {
      if (this.process !== 0 || this.isPaused) {
        return
      }
      this.currentIndex++;
      if(!this.songsList[this.currentIndex]){
        this.currentIndex--;
        return
      }
      this.currentMusic = this.songsList[this.currentIndex];
      Toast.show('播放失败,自动播放下一首!');
      this.resetCurrentMusic();
    }, 1000)
  };

  // 保存新增歌集
  saveMusicCollect = async () => {
    const date = new Date();
    this.musicCollectList.push({
      name:this.musicCollectName,
      time:`${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
      id:new Date().getTime()
    });
    AsyncStorage.setItem('musicCollectList', JSON.stringify(this.musicCollectList),function (error) {
      if(error){
        console.log(error)
      }
      console.log('保存成功');
    });
  };

  handleGetSelectedMusic(navigation){
    this.selectedSongsList = this.songsList.filter(song => song.isCheck);
    if(!this.selectedSongsList.length){
      Toast.show('未选择歌曲!');
      return
    }
    navigation.push('chooseMusicCollect',{screenKey:navigation.state.key})
  }

  handleSelectedAllMusic(){
    this.songsList = this.songsList.map(item =>{
      return {
        ...item,
        isCheck:true
      }
    })
  }

  handleSelectedOtherMusic(){
    this.songsList = this.songsList.map(item =>{
      return {
        ...item,
        isCheck:!item.isCheck
      }
    })
  }

  // 音乐集里删除音乐
  handleDelMusic(music){
    const obj = this.musicCollectList.find(item => item.id === this.currentMusicColelct.id);
    obj.songsList = obj.songsList.filter(item => item.id !== music.id);
    this.songsList = obj.songsList;
    AsyncStorage.setItem('musicCollectList', JSON.stringify(this.musicCollectList),function (error) {
      if(error){
        console.log(error)
      }
      console.log('保存成功');
    });
  }

  // 保存到某个歌集
  handleSaveToMusicCollect = async (item,navigation) => {
    try{
      const obj = this.musicCollectList.find(detail => detail.id === item.id);
      const arr = obj.songsList || [];
      // const selectedSongsList = this.songsList.filter(song => song.isCheck);
      const songsList = [];
      this.selectedSongsList.forEach(music => {
        if(arr.some(song => song.id === music.id)){
          return
        }
        songsList.push(music)
      });
      obj.songsList = songsList;
      AsyncStorage.setItem('musicCollectList',JSON.stringify(this.musicCollectList));
      Toast.show('保存成功');
      navigation.goBack(navigation.getParam('screenKey'));
    }catch (e) {
      console.log(e);
    }

  }


}

export default DataStore;
