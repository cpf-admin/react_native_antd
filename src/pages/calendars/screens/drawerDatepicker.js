import React, {useState, Fragment} from 'react';
import {View} from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

function DatepickerTem () {
  const [datetime, setDatetime] = useState(new Date());
  return (<View style={{width: '100%', height: 200, backgroundColor: '#bfbfbf'}}>
        <RNDateTimePicker
          style={{width: 200, height: 50, backgroundColor: 'red'}}
          testID="dateTimePicker"
          value={datetime}
          mode='datetime'
          is24Hour={true}
          display="block"
          isVisible={true}
          onChange={(datetime) => {
            setDatetime(datetime);
          }}
        />
  </View>)
}

export default DatepickerTem;