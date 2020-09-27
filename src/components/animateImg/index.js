import React, {Component} from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
 
const circle = require('../../assets/img/1.png');
class Friend extends Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
        this.state = {
        };
    }
    componentDidMount(){
        this.spin();
    }
    //旋转方法
    spin = () => {
        this.spinValue.setValue(0)
        Animated.timing(this.spinValue,{
          toValue: 1, // 最终值 为1，这里表示最大旋转 360度
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true
       }).start(() => this.spin())
    }
    render() {
        const { user, pwd, fadeAnim} = this.state;
        //映射 0-1的值 映射 成 0 - 360 度  
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],//输入值
            outputRange: ['0deg', '360deg'] //输出值
          })
        return(
            <View style={styles.container}>
                    <Animated.Image style={[styles.circle,{transform:[{rotate: spin }]}]} source={circle}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        height: 200,
        alignItems:'center',
        justifyContent:'center',
    },
    circle:{
        position:'absolute',
        width: 150,
        height: 150,
        borderRadius: 75
    }
});
export default Friend;