import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Text,
  Keyboard,
  Platform 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/taskSlice';
import NotificationService from '../utils/notifications';
import { useTheme } from '../hooks/useTheme';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskInput = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const notificationsEnabled = useSelector(state => state.settings.notificationsEnabled);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showReminder, setShowReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());

  const handleSubmit = () => {
    if (title.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
        reminder: showReminder ? reminderTime.toISOString() : null,
      };

      dispatch(addTask(newTask));

      if (notificationsEnabled && showReminder) {
        NotificationService.scheduleTaskReminder(newTask, reminderTime);
      }

      // Clear form and dismiss keyboard
      setTitle('');
      setDescription('');
      setShowReminder(false);
      Keyboard.dismiss();
    }
  };

  const handleReminderChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowReminder(false);
    }
    if (selectedDate) {
      setReminderTime(selectedDate);
    }
  };

  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task title"
        placeholderTextColor={theme.colors.subText}
        value={title}
        onChangeText={setTitle}
        returnKeyType="next"
      />
      
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Task description"
        placeholderTextColor={theme.colors.subText}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />
      
      {notificationsEnabled && (
        <View style={styles.reminderContainer}>
          <TouchableOpacity
            style={styles.reminderButton}
            onPress={() => setShowReminder(!showReminder)}
          >
            <Text style={styles.reminderText}>
              {showReminder ? '🔔 Remove Reminder' : '🔔 Add Reminder'}
            </Text>
          </TouchableOpacity>
          
          {(showReminder || Platform.OS === 'ios') && (
            <DateTimePicker
              value={reminderTime}
              mode="datetime"
              minimumDate={new Date()}
              onChange={handleReminderChange}
              textColor={theme.colors.text}
              style={styles.datePicker}
            />
          )}
        </View>
      )}

      <TouchableOpacity 
        style={[styles.button, !title.trim() && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!title.trim()}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const makeStyles = (theme) => StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.small,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.disabled,
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
  reminderContainer: {
    marginBottom: theme.spacing.sm,
  },
  reminderButton: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.primary + '20',
    borderRadius: theme.borderRadius.small,
    alignItems: 'center',
  },
  reminderText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  datePicker: {
    marginTop: theme.spacing.sm,
    alignSelf: 'center',
  },
});

export default React.memo(TaskInput); 