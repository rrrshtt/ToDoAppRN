import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

interface Props {
  onAdd: () => void;
  onTitleChange: (value: string) => void;
  title: string;
}

const TaskForm = ({onAdd, onTitleChange, title}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.field}
        onChangeText={onTitleChange}
        value={title}
      />
      <Button title="Add" onPress={onAdd} />
    </View>
  );
};

export default TaskForm;

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  field: {height: 40, borderColor: 'gray', borderWidth: 1, flex: 1},
});
