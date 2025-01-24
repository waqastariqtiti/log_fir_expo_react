import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // For picking the user's profile image

const organi = require('../assets/images/note.png'); 

const HomeScreen = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null); // State for profile image
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility

  // Function to pick a profile image
  const pickProfileImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Please grant access to your media library.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio for profile image
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setProfileImage(result.assets[0].uri); // Set the selected image as the profile picture
    }
  };

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={toggleDropdown} style={styles.listIconContainer}>
            <Ionicons name="list-outline" size={24} color="rgb(142, 202, 230)" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>UniBuddy</Text>
        </View>
        
        {/* Profile Image in the top right */}
        <TouchableOpacity onPress={() => router.push('/profile')} style={styles.profileImageContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : { uri: "https://static.vecteezy.com/system/resources/previews/003/715/527/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg" }} // Placeholder image
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Dropdown Section */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem}>
            <Ionicons name="notifications-outline" size={20} color="rgb(33, 158, 188)" />
            <Text style={styles.dropdownText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Ionicons name="settings-outline" size={20} color="rgb(33, 158, 188)" />
            <Text style={styles.dropdownText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Ionicons name="log-out-outline" size={20} color="rgb(33, 158, 188)" />
            <Text style={styles.dropdownText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Short Links Section */}
      <View style={styles.shortLinks}>
        <Link href="bla">
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
        <Image source={organi} style={styles.cardImage} />
        <Text style={styles.cardTitle}>Note Organization</Text>
        <Text style={styles.cardDescription}>
          Keep your notes well-organized and accessible with our powerful features.
        </Text>
        <Link href="./notes_organization/Home_Note" style={styles.button}>
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
    paddingLeft: 10,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    height:70, // Adding some padding to make space at the top
  },
  headerLeft: {
    flexDirection: "row",  // Align text and icon horizontally
    alignItems: "center",  // Center items vertically
  },
  headerTitle: {
    color: "rgb(255, 183, 3)",  // Yellowish color for title
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  listIconContainer: {
    marginLeft: 5,  // 5-unit space between the title and the list icon
  },
  profileImageContainer: {
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make it circular
    borderWidth: 2,
    borderColor: "#fff", // White border around the profile image
  },
  dropdown: {
    backgroundColor: "rgb(2, 48, 71)",  // Dark green background for dropdown
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    marginLeft: 10,
    position: "absolute",
    top: 60,
    left: 10,
    zIndex: 10,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  dropdownText: {
    color: "rgb(33, 158, 188)",  // Blue color for dropdown text
    marginLeft: 10,
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
