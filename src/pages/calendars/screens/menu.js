import React, {Component} from 'react';
import {Platform, StyleSheet, View, ScrollView, TouchableOpacity, TouchableHighlight, Text, Image} from 'react-native';

const appIcon = require('../img/app-icon-120x120.png');
const testIDs = require('../testIDs');

export default class MenuScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container} testID={testIDs.menu.CONTAINER}>
          <Image source={appIcon} style={styles.image}/>
          <TouchableOpacity
            testID={testIDs.CALENDARS}
            style={styles.menu}
            onPress={() => {
              this.props.navigation.navigate('Calendars')
            }}>
            <Text style={styles.menuText}>Calendars</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID={testIDs.CALENDAR_LIST}
            style={styles.menu}
            onPress={() => {
              this.props.navigation.navigate('CalendarsList')
            }}>
            <Text style={styles.menuText}>CalendarsList</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menu}
            onPress={() => {
              this.props.navigation.navigate('DatepickerTem')
            }}>
            <Text style={styles.menuText}>Datepicker</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menu}
            onPress={() => {
              this.props.navigation.navigate('WeekCalendars')
            }}>
            <Text style={styles.menuText}>WeekCalendars</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  pushScreen(screen, props) {
    this.props.navigation.navigate(screen);
  }

  // onCalendarsPress() {
  //   this.pushScreen('Calendars');
  // }

  // onCalendarListPress() {
  //   this.pushScreen('CalendarsList');
  // }

  // onHorizontalCalendarListPress() {
  //   this.pushScreen('HorizontalCalendarList');
  // }

  // onAgendaPress() {
  //   this.pushScreen('Agenda');
  // }

  // onExpandablePress() {
  //   this.pushScreen('ExpandableCalendar');
  // }

  // onTimelinePress() {
  //   this.pushScreen('TimelineCalendar');
  // }

  // onWeekPress() {
  //   this.pushScreen('ExpandableCalendar', {weekView: true});
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    margin: 30,
    width: 90,
    height: 90
  },
  menu: {
    width: 300,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRadius: 10,
    lineHeight: 50,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 18,
    color: '#2d4150'
  }
});
