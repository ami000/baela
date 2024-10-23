import { Drawer } from 'expo-router/drawer';
import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image, useColorScheme } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, DrawerActions, useRoute } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useTheme } from '@/src/constants/themeContext';
import DashboardIcon from "@/src/assets/light/menuIcons/Dashboard.png"
import DashboardActiveIcon from "@/src/assets/light/menuIcons/DashboardActive.png"
import StudyPlanIcon from "@/src/assets/light/menuIcons/StudyPlan.png"
import StudyPlanActiveIcon from "@/src/assets/light/menuIcons/StudyPlanActive.png"
import DarkBrandLogo from "@/src/assets/dark/logo/logo.png";
import BrandLogo from "@/src/assets/light/logo/logo.png";
import AppAvatar from '@/src/components/appAvatar';
import { useSelector } from 'react-redux';
import { Link, router, Stack, usePathname } from 'expo-router';

type DrawerToggleButtonProps = {
  tintColor?: string;
};

const DrawerToggleButton: React.FC<DrawerToggleButtonProps> = ({ tintColor }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <TouchableOpacity onPress={openDrawer} style={[styles.mainContainer, { backgroundColor: theme.backgroundColor3 }]}>
      <Feather name="menu" size={24} color={tintColor} />
    </TouchableOpacity>
  );
};

const DrawerRightContent: React.FC<{}> = () => {
  const { theme } = useTheme();
  const userDetails = useSelector(
    (state: any) => state?.userDetails?.userDetails
  );

  const handleProfileClick = () => {
    router.push("/(app)/profile")
  }

  return (
    <View style={[styles.rightContainer, { backgroundColor: theme.backgroundColor3 }]}>
      <TouchableOpacity >
        <Feather name="bell" size={24} color={theme.textColor1} style={styles.bellIcon} />
      </TouchableOpacity>
      <AppAvatar name={userDetails.nickName} style={{ height: 35, width: 35 }} onClick={handleProfileClick} />
    </View>
  );
};

function CustomDrawerContent(props: any) {
  const colorScheme = useColorScheme();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Image
          source={colorScheme === "dark" ? DarkBrandLogo : BrandLogo}
          style={styles.drawerIcon}
          resizeMode='contain'
        />
      </View>
      <View style={styles.drawerItemList}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

export default function RootLayout() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const isNoDrawerRoute = pathname.startsWith('/no-drawer');

  const styles2 = StyleSheet.create({
    drawerButtonItem: {
      backgroundColor: theme.textColor1, // Light gray background
      borderRadius: 8,
      width: "60%"
    },
    drawerButtonLabel: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.backgroundColor3,
      padding: 5,
    },
  });

  if (isNoDrawerRoute) {
    return (
      <Stack
        screenOptions={{
          statusBarHidden: true,
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(no-drawer)"
          options={{
            headerShown: false,
          }}
        />
      </Stack >
    );
  }

  return (
    <Drawer
      screenOptions={{
        headerLeft: () => <DrawerToggleButton tintColor={theme.textColor1} />,
        headerRight: () => <DrawerRightContent />,
        headerTitleContainerStyle: {
          backgroundColor: theme.backgroundColor3
        },
        headerTitleStyle: {
          color: theme.textColor1,
        },
        headerBackgroundContainerStyle: {
          backgroundColor: theme.backgroundColor3
        },
        headerBackground: () => {
          return <View />
        },
        headerStatusBarHeight: 0,
        drawerActiveBackgroundColor: "transparent",
        drawerHideStatusBarOnOpen: false,
        drawerStyle: {
          backgroundColor: theme.backgroundColor3,
        },
        drawerActiveTintColor: theme.primeColor,
        drawerInactiveTintColor: theme.menuItemColor,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="analyser"
        options={{
          drawerLabel: 'Pibi analyser',
          title: 'Pibi analyser',
          drawerItemStyle: styles2.drawerButtonItem,
          drawerLabelStyle: styles2.drawerButtonLabel,
          drawerActiveBackgroundColor: theme.primeColor,
          drawerActiveTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name="dashboard"
        options={{
          drawerLabel: 'Dashboard',
          title: 'Dashboard',
          drawerIcon: (props) => {
            return props.focused ? <Image source={DashboardActiveIcon} style={styles.icon} /> : <Image source={DashboardIcon} style={styles.icon} />
          },
        }}
      />
      <Drawer.Screen
        name="study-plan"
        options={{
          drawerLabel: 'Study Plan',
          title: 'Study Plan',
          drawerIcon: (props) => {
            return props.focused ? <Image source={StudyPlanActiveIcon} style={styles.icon} /> : <Image source={StudyPlanIcon} style={styles.icon} />
          },
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerItemStyle: {
            display: "none"
          },
          title: 'Profile',
        }}
      />
      <Drawer.Screen
        name="(no-drawer)"
        options={{
          drawerItemStyle: {
            display: "none"
          },
          headerShown: false,
          headerStatusBarHeight: 0
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 10
  },
  drawerItemList: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
  },
  mainContainer: {
    paddingLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: -15
  },
  drawerHeader: {
    height: 100,
    width: "80%",
    padding: 0, margin: 0,
    paddingLeft: 10,
  },
  drawerIcon: {
    width: "100%",
    height: 100
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
  },
  rightContainer: {
    flexDirection: "row",
    marginRight: 20,
    alignItems: "center"
  }
});