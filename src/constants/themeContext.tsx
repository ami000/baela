
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeColors {
  backgroundColor: string;
  backgroundColor2: string;
  backgroundColor3: string;
  backgroundColor4: string;
  textColor1: string;
  textColor2: string;
  titleColor: string;
  color1: string;
  color2: string;
  color3: string;
  activeColor: string;
  fontFamilyBody: string;
  fontSizeTextMd: number;
  lineHeightTextMd: number;
  spacingXl: number;
  spacingLg: number;
  radiusMd: number;
  gray300: string;
  gray200: string;
  gray500: string;
  gray900: string;
  backgroundPrimary: string;
  textSecondary700: string;
  border: string;
  analyzeColor: string;
  analyzeColorBg: string;
  primeColor: string;
  profileBg: string;
  sameText: string;
  calendarTodayBg: string;
  calendarOffRangeBg: string;
  placeholder: string;
  fieldBorder: string;
  specialBg: string;
  iconsStroke: string;
  calendarActiveBg: string;
  secondaryText: string;
  prelabelColor: string;
  menuItemColor: string;
  questionBg: string;
  scrollbar: string;
  countDownBar: string;
  commonBorder: string;
  graphLabel: string;
  graphLines: string;
  backIcon: string;
}

const lightTheme: ThemeColors = {
  backgroundColor: '#FFFFFF',
  backgroundColor2: '#FFFFFF',
  backgroundColor3: '#FAFAFA',
  backgroundColor4: '#FAFAFA',
  textColor1: '#252525',
  textColor2: '#FFFFFF',
  titleColor: '#F66A2E',
  color1: '#125167',
  color2: '#FDFBF9',
  color3: '#252525',
  activeColor: '#FCAC63',
  fontFamilyBody: 'System',
  fontSizeTextMd: 16,
  lineHeightTextMd: 24,
  spacingXl: 16,
  spacingLg: 12,
  radiusMd: 8,
  gray300: '#D1D5DB',
  gray200: '#E5E7EB',
  gray500: '#6B7280',
  gray900: '#111827',
  backgroundPrimary: '#FFF',
  textSecondary700: '#344054',
  border: '#E4E7EC',
  analyzeColor: '#D4D4D4',
  analyzeColorBg: '#F2F4F7',
  primeColor: '#EF884A',
  profileBg: '#FFF7ED',
  sameText: '#404040',
  calendarTodayBg: '#eaf6ff',
  calendarOffRangeBg: '#dddddd',
  placeholder: '#667085',
  fieldBorder: '#E5E7EB',
  specialBg: '#F5F5F5',
  iconsStroke: '#4B5563',
  calendarActiveBg: '#FFFFFF',
  secondaryText: '#6B7280',
  prelabelColor: '#344054',
  menuItemColor: '#A3A3A3',
  questionBg: '#F9FAFB',
  scrollbar: '#D9D9D9',
  countDownBar: "#F5F5F5",
  commonBorder: "#D0D5DD",
  graphLabel: "#1F2937",
  graphLines: "#F1F1F1",
  backIcon: '#6B7280',
};

const darkTheme: ThemeColors = {
  backgroundColor: '#121212',
  backgroundColor2: '#232323',
  backgroundColor3: '#121212',
  backgroundColor4: '#232323',
  textColor1: '#FFFFFF',
  textColor2: '#020C1B',
  titleColor: '#F66A2E',
  color1: '#FCAC63',
  color2: '#252525',
  color3: '#FCAC63',
  activeColor: '#FCAC63',
  fontFamilyBody: 'System',
  fontSizeTextMd: 16,
  lineHeightTextMd: 24,
  spacingXl: 16,
  spacingLg: 12,
  radiusMd: 8,
  gray300: '#D1D5DB',
  gray200: '#E5E7EB',
  gray500: '#E5E7EB',
  gray900: '#111827',
  backgroundPrimary: '#121212',
  textSecondary700: '#FFFFFF',
  border: '#404040',
  analyzeColor: '#98A2B3',
  analyzeColorBg: '#737373',
  primeColor: '#EF884A',
  profileBg: '#383838',
  sameText: '#404040',
  calendarTodayBg: '#5e5e5e',
  calendarOffRangeBg: '#b6b6b6',
  placeholder: '#6B7280',
  fieldBorder: '#6B7280',
  specialBg: '#121212',
  iconsStroke: '#D4D4D4',
  calendarActiveBg: '#383838',
  prelabelColor: '#F3F4F6',
  secondaryText: '#D4D4D4',
  menuItemColor: '#A3A3A3',
  questionBg: '#383838',
  scrollbar: '#383838',
  countDownBar: '#383838',
  commonBorder: "#D0D5DD",
  graphLabel: "#A3A3A3",
  graphLines: "#383838",
  backIcon: '#F9FAFB',
};

interface ThemeContextType {
  theme: ThemeColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeColors>(colorScheme === 'dark' ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, isDark: colorScheme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
