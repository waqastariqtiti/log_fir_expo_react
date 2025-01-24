import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Import Expo Router's useRouter

export default function IndexPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      <Button title="Go to Login" onPress={() => router.push("/Login")} />
        <Text>Or</Text>
      <Button title="signup your account! " onPress={() => router.push("/Signup")} />
      <Button title="signup your a " onPress={() => router.push("/Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8ECAE6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#023047",
  },
});
