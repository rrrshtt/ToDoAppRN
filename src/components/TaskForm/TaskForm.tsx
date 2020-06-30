import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

interface Props {
  onAdd: () => void;
}

const TaskForm = ({onAdd}: Props) => {
  const [title, setTitle] = useState<string>('');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.field}
        onChangeText={(value) => setTitle(value)}
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
