import React, {Component, Fragment} from 'react';
import {View, Button, ScrollView, Text} from 'react-native';
import { Drawer, List, Provider }  from '@ant-design/react-native';
import DatePicker from 'react-native-datepicker';

class DatepickerTem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      drawerOpen: false,
      value: ''
    }
  }
  onChange = value => {
    this.setState({ value });
  };
  renderDrawer() {
    const sidebar = (
      <ScrollView style={{padding: 5}}>
        <DatePicker
          style={{ width: '100%' }}
          date={this.state.date}
          mode="date"
          androidMode="spinner"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          confirmBtnText="确定"
          cancelBtnText="取消"
          showIcon={false}
          minDate="2018-05-01"
          maxDate="2019-06-01"
          customStyles={{
              dateIcon: {
              },
              dateInput: {
                  
              }
          }}
          onDateChange={(date) => { this.setState({ date: date }) }}
      />
      </ScrollView>
    );
    return(
      <Drawer
        sidebar={sidebar}
        position='left'
        open={false}
        drawerRef={el => (this.drawer = el)}
        drawerBackgroundColor="#fff"
      >
        <View style={{ flex: 1, marginTop: 114, padding: 8 }}>
          <Button title='Open drawer' onPress={() => this.drawer && this.drawer.openDrawer()}>
            Open drawer
          </Button>
        </View>
      </Drawer>
    )  
  }
  render() {
    return(
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>react-native-datepicker</Text>
        <Text>{`已选时间:${this.state.date}`}</Text>
        {this.renderDrawer()}
      </ScrollView>
    ) 
  } 
}

export default DatepickerTem;