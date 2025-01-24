import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icon
import * as ImagePicker from "expo-image-picker"; // To pick images from device

const UserProfilePage = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null); // State for the profile image

  // Function to pick an image from the device
  const pickImage = async () => {
    // Ask for permission to access the image library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the media library is required!");
      return;
    }

    // Pick the image from the device
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Keep it a square shape (round profile image)
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setProfileImage(result.assets[0].uri); // Update the profile image with the selected one
    }
  };

  // Logout function (for now just a simple alert)
  const logout = () => {
    Alert.alert("Logged out", "You have successfully logged out.");
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : { uri: "https://placekitten.com/200/200" }
            } // Placeholder image URL
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>User Name</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 50, // Top margin to space out from the top of the screen
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Make it round
    borderWidth: 4,
    borderColor: "#000", // Border color
    marginBottom: 10, // Space between image and user name
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#FF6347", // Tomato color for logout button
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserProfilePage;
