import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Task} from 'src/shared/types/task';

interface Props {
  task: Task;
  onStart: () => void;
  onStop: () => void;
  onDelete: () => void;
}

function dhm(ms: number) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = ms % (60 * 1000);
  const sec = Math.floor(minutesms / 1000);
  return days + ':' + hours + ':' + minutes + ':' + sec;
}

const TaskCard = ({task, onStart, onDelete, onStop}: Props) => {
  const [timeSpent, setTimeSpent] = useState(task.timeSpentMs);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(
        task.isPaused
          ? task.timeSpentMs
          : task.timeSpentMs + Date.now() - task.startedTimestamp,
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [task.isPaused, task.startedTimestamp, task.timeSpentMs]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.timeSpent}>{dhm(timeSpent)}</Text>
      {task.isPaused ? (
        <Button title="Start" onPress={onStart} />
      ) : (
        <Button title="Stop" onPress={onStop} />
      )}
      <Button title="Delete" onPress={onDelete} />
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  timeSpent: {
    fontSize: 20,
    flex: 1,
  },
});
