import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../constants/Style';
import Title from './components/Title';
import Button from './components/Button';
import { colors } from '../../constants/Colors';
import Iconic from '../../components/ui/Icons/Icons';
import { Calendar } from 'react-native-calendars';
import { getFormatedDate, getTodayDate, getLastYear } from '../../utils/Functions';

const DateOfBirth = () => {
    const [calendarToggle, setCalendarToggle] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getLastYear());
    const [formatedDate, setFormatedDate] = useState(getFormatedDate(new Date(), "WWW MMM DD YYYY"));
    const getMarkedDates = () => {
        const markedDates = {};
        markedDates[selectedDate] = { selected: true };
        return markedDates;
    };
    return (
        <View style={[globalStyles.wrapper, { paddingHorizontal: 20 }]}>
            <Title title="Your Date of Birth" />
            <View style={styles.datContaienr} >
                <Text style={styles.date}>{formatedDate}</Text>
                <TouchableOpacity> 
                    <Iconic 
                    name="calendar" size={24} 
                    color={colors.red}   
                    onPress={() =>{
                        setCalendarToggle(!calendarToggle);
                    }}
                    />
                </TouchableOpacity>
            </View>
            {
                calendarToggle &&  <Calendar
                    initialDate={getLastYear()}
                    maxDate={getLastYear()}
                    enableSwipeMonths={true}
                    markedDates={getMarkedDates()}
                    onDayPress={day => {
                        setSelectedDate(day.dateString);
                        setFormatedDate(getFormatedDate(new Date(day.dateString), "WWW MMM DD YYYY"));
                        setCalendarToggle(false);
                    }}
                    theme={styles.calendar}
                    style={styles.calendarContainer}
                /> 

            }
            <Button />
        </View>
    )
}

const styles = StyleSheet.create({
    datContaienr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: colors.white,
        elevation: 3,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    date: {
        color: colors.grey_200,
        fontSize: 16,
        fontFamily: 'Roboto-Light'

    },
    calendarContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginVertical: 10,
        elevation: 3,
    },
    calendar:{
        calendarBackground: colors.white,
        selectedDayBackgroundColor: colors.red,
        selectedDayTextColor: colors.white,
        dayTextColor: colors.grey_200,
        textDisabledColor: colors.grey,
        monthTextColor: colors.black,
        textMonthFontWeight: 'bold',
        arrowColor: colors.red,
    }
})

export default DateOfBirth

