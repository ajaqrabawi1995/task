import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '../store/taskSlice';
import CheckBox from '@react-native-community/checkbox';
import { useTheme } from '../hooks/useTheme';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const opacity = new Animated.Value(1);

  const handleDelete = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      dispatch(deleteTask(task.id));
    });
  };

  const styles = makeStyles(theme);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <CheckBox
        value={task.completed}
        onValueChange={() => dispatch(toggleTask(task.id))}
        tintColors={{ 
          true: theme.colors.checkbox,
          false: theme.colors.subText 
        }}
      />
      <View style={styles.textContainer}>
        <Text style={[
          styles.title,
          task.completed && styles.completedText
        ]}>
          {task.title}
        </Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>
      <TouchableOpacity 
        onPress={handleDelete}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const makeStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.small,
    marginVertical: theme.spacing.xs,
    marginHorizontal: theme.spacing.sm,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  textContainer: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  description: {
    fontSize: 14,
    color: theme.colors.subText,
    marginTop: theme.spacing.xs,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: theme.colors.subText,
  },
  deleteButton: {
    padding: theme.spacing.sm,
  },
  deleteText: {
    fontSize: 24,
    color: theme.colors.error,
  },
});

export default React.memo(TaskItem); 