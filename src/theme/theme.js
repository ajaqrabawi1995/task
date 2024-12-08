export const lightTheme = {
  colors: {
    primary: '#007AFF',
    background: '#F8F8F8',
    card: '#FFFFFF',
    text: '#000000',
    subText: '#666666',
    border: '#EEEEEE',
    error: '#FF3B30',
    success: '#34C759',
    checkbox: '#007AFF',
    buttonText: '#FFFFFF',
    disabled: '#CCCCCC',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
};

export const darkTheme = {
  colors: {
    primary: '#0A84FF',
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    subText: '#8E8E93',
    border: '#38383A',
    error: '#FF453A',
    success: '#32D74B',
    checkbox: '#0A84FF',
    buttonText: '#FFFFFF',
    disabled: '#3A3A3C',
  },
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  shadows: lightTheme.shadows,
};