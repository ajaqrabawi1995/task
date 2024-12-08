import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../store/taskSlice';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import SearchBar from '../components/SearchBar';
import FilterButtons from '../components/FilterButtons';
import ErrorView from '../components/ErrorView';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.tasks.status);
  const error = useSelector(state => state.tasks.error);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <ErrorView 
        message={error} 
        onRetry={() => dispatch(getTasks())} 
      />
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar />
      <FilterButtons />
      <TaskInput />
      <TaskList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen; 