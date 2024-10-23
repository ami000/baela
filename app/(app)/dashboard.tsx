import { View, StyleSheet, ScrollView } from 'react-native';
import ExamCountdown from '@/src/components/dashboard/examCountdown';
import { useTheme } from '@/src/constants/themeContext';
import ErrorLogsAnalysed from '@/src/components/dashboard/errorAnalysed';
import PerformanceBySection from '@/src/components/dashboard/performanceChart';
import StudyTimeAllocation from '@/src/components/dashboard/studyAllocationChart';
import AvgAccuracyChart from '@/src/components/dashboard/avgAccuracyChart';
import TimeManagementChart from '@/src/components/dashboard/timeManagement';

export default function Dashboard() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    dashboardContainer: {
        backgroundColor: theme.backgroundColor3,
        flex: 1,
      },
      scrollViewContent: {
        gap: 20,
        padding: 20,
        paddingBottom: 20, 
      },
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.dashboardContainer}>
      <ErrorLogsAnalysed count={40} />
      <ExamCountdown examDate={new Date('2024-11-10T19:12:26.071Z')} />
      <PerformanceBySection />
      <StudyTimeAllocation />
      <AvgAccuracyChart />
      <TimeManagementChart />
    </ScrollView>
  );
}
