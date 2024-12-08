import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.items);
  const filter = useSelector(state => state.tasks.filter);
  const searchQuery = useSelector(state => state.tasks.searchQuery);

  const filteredTasks = useCallback(() => {
    return tasks.filter(task => {
      const matchesFilter = 
        filter === 'all' || 
        (filter === 'completed' && task.completed) ||
        (filter === 'incomplete' && !task.completed);
        
      const matchesSearch = 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, searchQuery]);

  const renderItem = ({ item }) => (
    <TaskItem task={item} />
  );

  return (
    <FlatList
      data={filteredTasks()}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default React.memo(TaskList); 