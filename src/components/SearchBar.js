import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/taskSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.tasks.searchQuery);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={(text) => dispatch(setSearchQuery(text))}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
});

export default React.memo(SearchBar); 