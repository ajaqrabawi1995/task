import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    darkMode: false,
    notificationsEnabled: true,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
  },
});

export const { toggleTheme, toggleNotifications } = settingsSlice.actions;
export default settingsSlice.reducer; 