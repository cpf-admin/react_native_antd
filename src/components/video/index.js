import React,{Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Video from 'react-native-video';

class MyVideo extends Component{

  handleVideoError(err) {
    console.log(err);
  }

  handleVideoEnd() {
    // this.props.onEnd();
  }

  handleVideoLoad() {
    console.log('load')
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


  render(){
    const {songUrl,volume,isPaused} = this.props;
    console.log(songUrl);
    return(
      <View sytle={styles.container}>
        {
          songUrl && <Video
            audioOnly
            playInBackground
            // volume='0.5'
            paused={false}
            source={{uri: songUrl}}   // Can be a URL or a local file.
            // ref={(ref) => {
            //   this.props.onSavePlayer(ref);
            // }}                                      // Store reference
            onEnd={this.handleVideoEnd.bind(this)}
            onLoad={this.handleVideoLoad.bind(this)}
            onLoadStart={this.handleVideoLoadStart.bind(this)}
            onTimedMetadata={this.handleVideoTime.bind(this)}
            onProgress={this.handleVideoProgress.bind(this)}
            onVideoError={this.err.bind(this)}
            onError={this.handleVideoError.bind(this)}               // Callback when video cannot be loaded
          />
        }
      </View>
    )
  }
}
const styles= StyleSheet.create({
  container: {
    height: 100
  }
})

export default MyVideo;