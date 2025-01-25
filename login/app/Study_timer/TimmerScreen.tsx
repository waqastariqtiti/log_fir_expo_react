import React from "react";
import { View, Text, TouchableOpacity} from "react-native";
import styles from "./style";

const TimerScreen = () => {
    const [timeLeft, setTimeLeft] = React.useState(25 * 60); // 25 minutes
    const [isRunning, setIsRunning] = React.useState(false);
  
    React.useEffect(() => {
        let timer: number | undefined; // Declare timer with a type that includes number or undefined
        if (isRunning && timeLeft > 0) {
          timer = window.setInterval(() => setTimeLeft((prev) => prev - 1), 1000); // Use window.setInterval
        } else {
          if (timer) clearInterval(timer);
        }
        return () => {
          if (timer) clearInterval(timer); // Cleanup
        };
      }, [isRunning, timeLeft]);
      
  
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Timer</Text>
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsRunning((prev) => !prev)}
        >
          <Text style={styles.buttonText}>{isRunning ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsRunning(false);
            setTimeLeft(25 * 60);
          }}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    );
  };
  export default TimerScreen;