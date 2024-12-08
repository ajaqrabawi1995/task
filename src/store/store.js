import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    settings: settingsReducer,
  },
}); 