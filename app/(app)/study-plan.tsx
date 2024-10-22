import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';

interface Event {
  name: string;
}

interface DayEvents {
  [date: string]: Event[];
}

const AdaptiveStudyPlan: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2023-08-21');
  const [currentMonth, setCurrentMonth] = useState('August');

  const events: DayEvents = {
    '2023-08-21': [
      { name: 'Number Properties & Factors' },
      { name: 'Number Properties & Factors' },
    ],
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Feather name="menu" size={24} color="black" />
      <Text style={styles.headerTitle}>Adaptive Study Plan</Text>
      <View style={styles.headerRight}>
        <Feather name="bell" size={24} color="black" style={styles.bellIcon} />
        <Text style={styles.headerInitials}>AB</Text>
      </View>
    </View>
  );

  const renderCourseSection = () => (
    <View style={styles.courseSection}>
      <View style={styles.courseSectionLeft}>
        <View style={styles.orangeSquare}>
          <Feather name="book" size={24} color="white" />
        </View>
        <Text style={styles.courseSectionText}>NO OF COURSE SECTION</Text>
      </View>
      <View style={styles.courseSectionRight}>
        <Text style={styles.courseSectionNumber}>10</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </View>
    </View>
  );

  const renderCalendar = () => (
    <Calendar
      current={selectedDate}
      onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
      onMonthChange={(month: DateData) => setCurrentMonth(month.month.toString())}
      hideArrows={false}
      renderArrow={(direction: any) => (
        <Feather
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
          size={24}
          color="black"
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
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#FF9500',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#FF9500',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#FF9500',
        selectedDotColor: '#ffffff',
        arrowColor: 'orange',
        monthTextColor: 'black',
        textDayFontFamily: 'System',
        textMonthFontFamily: 'System',
        textDayHeaderFontFamily: 'System',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 18,
        textDayHeaderFontSize: 16,
      }}
    />
  );

  const renderEvents = () => (
    <View style={styles.eventsContainer}>
      <Text style={styles.eventsTitle}>Study Schedule</Text>
      {events[selectedDate]?.map((event, index) => (
        <View key={index} style={styles.eventItem}>
          <View style={styles.eventDot} />
          <Text style={styles.eventText}>{event.name}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* {renderHeader()} */}
      {renderCourseSection()}
      {renderCalendar()}
      {renderEvents()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    marginRight: 16,
  },
  headerInitials: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9500',
  },
  courseSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  courseSectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orangeSquare: {
    backgroundColor: '#FF9500',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 16,
  },
  courseSectionText: {
    fontSize: 14,
    color: '#666',
  },
  courseSectionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseSectionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  eventsContainer: {
    padding: 16,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF9500',
    marginRight: 8,
  },
  eventText: {
    fontSize: 16,
    color: '#FF9500',
  },
});

export default AdaptiveStudyPlan;