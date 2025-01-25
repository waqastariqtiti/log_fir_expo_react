import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import styles from "./style";

const HomeScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Study Timer</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/timer")}>
          <Text style={styles.buttonText}>Start Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/tasks")}>
          <Text style={styles.buttonText}>View Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/stats")}>
          <Text style={styles.buttonText}>Statistics</Text>
        </TouchableOpacity>
      </View>
    );
  };
  export default HomeScreen;