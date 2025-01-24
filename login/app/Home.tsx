import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const organi = require('../assets/images/note.png'); 

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="notifications-outline" size={24} color="rgb(142, 202, 230)" />
          <Ionicons name="settings-outline" size={24} color="rgb(142, 202, 230)" style={styles.icon} />
        </View>
      </View>

      {/* Short Links Section */}
      <View style={styles.shortLinks}>
        <Link href='bla'>
        <TouchableOpacity style={styles.link}>
          <Ionicons name="document-text-outline" size={20} color="rgb(33, 158, 188)" />
          <Text style={styles.linkText}>My Notes</Text>
        </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.link}>
          <Ionicons name="heart-outline" size={20} color="rgb(33, 158, 188)" />
          <Text style={styles.linkText}>Favorite Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Ionicons name="help-circle-outline" size={20} color="rgb(33, 158, 188)" />
          <Text style={styles.linkText}>Help</Text>
        </TouchableOpacity>
      </View>

      {/* Main Section */}
      <View style={styles.card}>
        <Image
          source={organi}
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>Note Organization</Text>
        <Text style={styles.cardDescription}>
          Keep your notes well-organized and accessible with our powerful features.
        </Text>
        <Link href='./notes_organization/Home_Note' style={styles.button}>
          <Text style={styles.buttonText}>Learn More</Text>
        </Link>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(242, 242, 242)",  // Light gray background
  },
  header: {
    backgroundColor: "rgb(2, 48, 71)",  // Dark greenish color for header
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "rgb(255, 183, 3)",  // Yellowish color for title
    fontSize: 20,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  shortLinks: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  link: {
    alignItems: "center",
  },
  linkText: {
    marginTop: 5,
    fontSize: 14,
    color: "rgb(33, 158, 188)",  // Blue color for links
  },
  card: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "rgb(33, 158, 188)",  // Blue color for title
  },
  cardDescription: {
    fontSize: 14,
    color: "rgb(33, 158, 188)",  // Blue color for description text
    marginBottom: 15,
  },
  button: {
    backgroundColor: "rgb(251, 133, 0)",  // Orange color for button
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
