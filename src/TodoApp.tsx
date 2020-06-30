import {inject, observer} from 'mobx-react';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import TaskCard from './components/TaskCard/TaskCard';
import TaskForm from './components/TaskForm/TaskForm';
import {TaskStore} from './store/TaskStore';

interface Props {
  store: TaskStore;
}

const TaskApp = ({store}: Props) => {
  console.log(store);
  return (
    <FlatList
      ListEmptyComponent={
        <Text style={styles.waiting}>Waiting for tasks...</Text>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={<TaskForm onAdd={store.addTask} />}
      stickyHeaderIndices={[0]}
      data={store!.tasks}
      renderItem={({item}) => (
        <TaskCard
          key={item.id}
          task={item}
          onStart={store!.startTask(item.id)}
          onStop={store!.pauseTask(item.id)}
          onDelete={store!.deleteTask(item.id)}
        />
      )}
    />
  );
};

export default inject('store')(observer(TaskApp));

const styles = StyleSheet.create({
  container: {},
  waiting: {
    fontSize: 24,
    alignSelf: 'center',
    opacity: 0.2,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
