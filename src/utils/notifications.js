import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

class NotificationService {
  constructor() {
    this.configure();
  }

  configure = () => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    PushNotification.createChannel(
      {
        channelId: 'tasks-channel',
        channelName: 'Tasks Channel',
        channelDescription: 'Channel for task reminders',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`Channel created: ${created}`)
    );
  };

  scheduleTaskReminder = (task, time) => {
    PushNotification.localNotificationSchedule({
      channelId: 'tasks-channel',
      title: 'Task Reminder',
      message: `Don't forget to complete: ${task.title}`,
      date: time,
      allowWhileIdle: true,
      repeatType: 'day',
    });
  };

  cancelTaskReminder = (taskId) => {
    PushNotification.cancelLocalNotifications({ id: taskId });
  };

  scheduleDaily = (hour, minute) => {
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hour);
    scheduledTime.setMinutes(minute);
    scheduledTime.setSeconds(0);

    if (scheduledTime < now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    PushNotification.localNotificationSchedule({
      channelId: 'tasks-channel',
      title: 'Daily Tasks Review',
      message: 'Time to review your tasks for today!',
      date: scheduledTime,
      repeatType: 'day',
      allowWhileIdle: true,
    });
  };
}

export default new NotificationService(); 