import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/taskSlice';

const FilterButtons = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(state => state.tasks.filter);

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'incomplete' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <View style={styles.container}>
      {filters.map(filter => (
        <TouchableOpacity
          key={filter.value}
          style={[
            styles.filterButton,
            currentFilter === filter.value && styles.activeFilter
          ]}
          onPress={() => dispatch(setFilter(filter.value))}
        >
          <Text style={[
            styles.filterText,
            currentFilter === filter.value && styles.activeFilterText
          ]}>
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginHorizontal: 4,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    color: '#666',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#fff',
  },
});

export default React.memo(FilterButtons); 