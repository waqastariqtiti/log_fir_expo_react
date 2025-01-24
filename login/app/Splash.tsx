import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Import Expo Router's useRouter

export default function IndexPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My Website</Text>
      <Text style={styles.subtitle}>Please choose an option to get started</Text>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => router.push("/Login")} color="rgb(142, 202, 230)" />
        <View style={styles.orContainer}>
          <Text style={styles.orText}>Or</Text>
        </View>
        <Button title="Sign Up" onPress={() => router.push("/Signup")} color="rgb(251, 133, 0)" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(142, 202, 230)", // Light Blue
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "rgb(2, 48, 71)", // Deep Blue
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "rgb(33, 158, 188)", // Teal
    marginBottom: 30,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 350,
  },
  orContainer: {
    marginVertical: 15,
    alignItems: "center",
  },
  orText: {
    fontSize: 18,
    color: "rgb(33, 158, 188)", // Teal
  },
});
