import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../theme/theme';

export const useTheme = () => {
  const isDarkMode = useSelector(state => state.settings.darkMode);
  return isDarkMode ? darkTheme : lightTheme;
}; 