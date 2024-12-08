import React from 'react';
import { View, StyleSheet, Switch, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, toggleNotifications } from '../store/settingsSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { darkMode, notificationsEnabled } = useSelector(state => state.settings);

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={() => dispatch(toggleTheme())}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={() => dispatch(toggleNotifications())}
        />
      </View>

      <Text style={styles.version}>Version 1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  version: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
});

export default SettingsScreen; 