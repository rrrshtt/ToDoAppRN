import {Provider} from 'mobx-react';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {taskStore} from './src/store/TaskStore';
import TaskApp from './src/TodoApp';

const App = () => {
  console.log(taskStore);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Provider store={taskStore}>
          <TaskApp />
        </Provider>
      </SafeAreaView>
    </>
  );
};

export default App;
