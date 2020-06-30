import {action, observable} from 'mobx';
import {create, persist} from 'mobx-persist';
import {AsyncStorage} from 'react-native';
import uuid from 'react-native-uuid';
import {Task} from 'src/shared/types/task';
export class TaskStore {
  @persist
  @observable
  title = '';

  @action
  updateTitleField = (value: string) => {
    this.title = value;
  };

  @persist('list')
  @observable
  tasks: Task[] = [];

  @action
  addTask = () => {
    const newTask: Task = {
      id: uuid.v4(),
      title: this.title,
      startedTimestamp: Date.now(),
      timeSpentMs: 0,
      isPaused: false,
    };
    this.tasks.push(newTask);
  };

  @action
  deleteTask = (id: string) => () => {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  };

  @action
  pauseTask = (id: string) => () => {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isPaused: true,
          timeSpentMs: task.timeSpentMs + Date.now() - task.startedTimestamp,
        };
      } else {
        return task;
      }
    });
  };

  @action
  startTask = (id: string) => () => {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isPaused: false,
          startedTimestamp: Date.now(),
        };
      } else {
        return task;
      }
    });
  };
}

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

export const taskStore = new TaskStore();

hydrate('task', taskStore);
