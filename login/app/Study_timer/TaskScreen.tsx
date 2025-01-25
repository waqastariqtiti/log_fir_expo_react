import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from "react-native";
import { router } from "expo-router";
import styles from "./style";

const TaskScreen = () => {
    const [tasks, setTasks] = React.useState<string[]>([]);
    const [newTask, setNewTask] = React.useState("");
  
    const addTask = () => {
      if (newTask.trim()) {
        setTasks([...tasks, newTask]);
        setNewTask("");
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tasks</Text>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <Text style={styles.taskItem}>{item}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };
  
  
  export default TaskScreen;