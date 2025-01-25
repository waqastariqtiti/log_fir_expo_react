import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8f9fa",
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 16,
      color: "#6c757d",
      marginBottom: 24,
      textAlign: "center",
    },
    button: {
      backgroundColor: "#007bff",
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      marginBottom: 12,
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "bold",
    },
    timer: {
      fontSize: 48,
      fontWeight: "bold",
      marginBottom: 24,
    },
    input: {
      width: "100%",
      borderColor: "#ced4da",
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
    },
    taskItem: {
      fontSize: 16,
      color: "#495057",
      marginVertical: 4,
    },
  });
  
  export default styles;