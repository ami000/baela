import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/src/constants/themeContext';
import Notepad from "@/src/assets/light/Notepad.png";
import EventCard from '@/src/components/eventCard';

interface Event {
  name: string;
}

interface DayEvents {
  [date: string]: Event[];
}

const monthsArray = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const AdaptiveStudyPlan: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2023-08-21');
  const [currentMonth, setCurrentMonth] = useState('August');
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);
  const [eventColors, setEventColors] = useState({})
  const { theme, isDark } = useTheme();
  const [calendarTheme, setCalendarTheme] = useState({
    backgroundColor: theme.backgroundColor2,
    calendarBackground: theme.backgroundColor2,
    textSectionTitleColor: theme.placeholder,
    selectedDayBackgroundColor: theme.primeColor,
    selectedDayTextColor: "white",
    todayTextColor: theme.textColor1,
    dayTextColor: theme.textColor1,
    textDisabledColor: '#d9e1e8',
    dotColor: '#FF9500',
    selectedDotColor: theme.backgroundColor2,
    arrowColor: 'orange',
    monthTextColor: theme.textColor1,
    textDayFontFamily: 'System',
    textMonthFontFamily: 'System',
    textDayHeaderFontFamily: 'System',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 16,
  });

  useEffect(() => {
    setCalendarTheme({ ...calendarTheme });
  }, [isDark]);

  const events: DayEvents = {
    '2023-08-21': [
      { name: 'Number Properties & Factors' },
      { name: 'Nothing' },
    ],
    '2023-08-22': [
      { name: 'Algebraa' },
      { name: 'Something' },
      { name: 'Factors' }
    ],

  };

  const fixedColors = [
    { lightShade: "#FFF7ED", darkShade: "#EF884A" },
    { lightShade: "#EEF2FF", darkShade: "#6366F1" },
    { lightShade: "#F0FDFA", darkShade: "#134E4A" },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor3,
      padding: 20,
      gap: 20
    },
    courseSection: {
      borderRadius: 10,
      backgroundColor: theme.backgroundColor2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    courseSection2: {
      flexDirection: "column",
      gap: 5
    },
    courseSectionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    orangeSquare: {
      backgroundColor: "#FFF7ED",
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginRight: 16,
    },
    courseSectionText: {
      fontSize: 14,
      color: theme.textColor1,
    },
    courseSectionNumber: {
      fontSize: 22,
      color: theme.textColor1,
      fontWeight: 'bold',
    },
    courseSectionRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    eventsContainer: {
      gap: 10
    },
    eventsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme.textColor1
    },
    calendarWrapper: {
      borderRadius: 10,
      overflow: 'hidden', // Ensure the corners are rounded
    },
    modalContent: {
      backgroundColor: theme.backgroundColor2,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 18,
      color: theme.textColor1,
      paddingVertical: 10,
    },
    modalCloseButton: {
      marginTop: 20,
      backgroundColor: '#FF9500',
      padding: 10,
      borderRadius: 10,
    },
    modalCloseText: {
      color: 'white',
      fontSize: 16,
    },
    icon: {
      height: 30,
    }
  });

  const renderCourseSection = () => (
    <View style={styles.courseSection}>
      <View style={styles.courseSectionLeft}>
        <View style={styles.orangeSquare}>
          <Image source={Notepad} resizeMode='contain' style={styles.icon} />
        </View>
        <View style={styles.courseSection2} >
          <Text style={styles.courseSectionText}>NO OF COURSE SECTION</Text>
          <Text style={styles.courseSectionNumber}>10</Text>
        </View>
      </View>
      <View style={styles.courseSectionRight}>
        <Feather name="chevron-right" size={24} color={theme.textColor1} />
      </View>
    </View>
  );

  const renderCalendar = () => (
    <View style={styles.calendarWrapper}>
      <Calendar
        key={isDark ? "dark" : "light"}
        current={selectedDate}
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
        onMonthChange={(month: DateData) => setCurrentMonth(monthsArray[month.month - 1])}
        hideArrows={false}
        renderArrow={(direction: any) => (
          <Feather
            name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
            size={24}
            color={theme.textColor1}
          />
        )}
        monthFormat={'MMMM'}
        hideExtraDays={true}
        firstDay={1}
        onPressArrowLeft={(subtractMonth: any) => subtractMonth()}
        onPressArrowRight={(addMonth: any) => addMonth()}
        enableSwipeMonths={true}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#FF9500' },
        }}
        theme={calendarTheme}
      />
    </View>
  );

  const renderEvents = () => {
    const temp: any = { ...eventColors }
    return (
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsTitle}>Study Schedule</Text>
        <View style={styles.eventsContainer}>
          {events[selectedDate]?.map((event, index) => {
            let selectedColor;
            if (event.name in temp) {
              selectedColor = temp[event.name]
            } else {
              selectedColor = fixedColors[Object.keys(temp).length % 3]
              temp[event.name] = selectedColor;
              setEventColors(temp)
            }
            return (
              <EventCard title={event.name} color={selectedColor} key={index} />
            );
          })}
        </View>
      </View>
    )
  }

  const renderMonthYearPicker = () => (
    <Modal visible={showMonthYearPicker} animationType="slide" transparent>
      <View style={styles.modalContent}>
        <ScrollView>
          {monthsArray.map((month, index) => (
            <TouchableOpacity key={index} onPress={() => {
              setCurrentMonth(month);
              setShowMonthYearPicker(false);
            }}>
              <Text style={styles.modalText}>{month}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.modalCloseButton}
          onPress={() => setShowMonthYearPicker(false)}
        >
          <Text style={styles.modalCloseText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderCourseSection()}
      {renderCalendar()}
      {renderEvents()}
      {renderMonthYearPicker()}
    </View>
  );
};

export default AdaptiveStudyPlan;
