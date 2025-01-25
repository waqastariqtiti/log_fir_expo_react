import React from "react";
import { View, Text} from "react-native";
import styles from "./style";

const StatisticsScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Statistics</Text>
        <Text style={styles.subtitle}>Track your progress here</Text>
      </View>
    );
  };
  export default StatisticsScreen;