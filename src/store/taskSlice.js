import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, addTaskApi, deleteTaskApi, updateTaskApi } from '../api/todoApi';

export const getTasks = createAsyncThunk('tasks/getTasks', async () => {
  const response = await fetchTasks();
  return response;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filter: 'all',
    searchQuery: '',
  },
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addTask, toggleTask, deleteTask, setFilter, setSearchQuery } = taskSlice.actions;
export default taskSlice.reducer; 