import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, Modal, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref, get, set } from "firebase/database";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { storage, database } from "../firebase.config";

const UserProfilePage = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState("Loading...");
  const [friendsCount, setFriendsCount] = useState(5);
  const [groupsCount, setGroupsCount] = useState(3);
  const [loading, setLoading] = useState(false);

  const userId = "fTfg5soFMvf2wUv4EUCDsyUiaKi2"; // Replace with actual logged-in user's ID

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = ref(database, `users/${userId}`);
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUsername(data.username || "No username");
          setProfileImage(data.profileImage || null);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  // Function to pick an image
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert("Permission Denied", "Permission to access the media library is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Something went wrong while picking the image.");
    }
  };

  // Function to upload the image
  const uploadImage = async () => {
    if (!profileImage) {
      Alert.alert("Error", "Please select a profile image first.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(profileImage);
      const blob = await response.blob();

      const fileName = `profile_images/${Date.now()}.jpg`;
      const imageRef = storageRef(storage, fileName);

      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);

      const userRef = ref(database, `users/${userId}`);
      await set(userRef, {
        username: username,
        profileImage: downloadURL,
      });

      Alert.alert("Success", "Profile image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload the profile image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={profileImage ? { uri: profileImage } : { uri: "https://placekitten.com/200/200" }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>{username}</Text>
          <Text style={styles.friendsGroups}>
            {friendsCount} Friends | {groupsCount} Groups
          </Text>
        </View>
      </View>

      {loading && <ActivityIndicator size="large" color="#218EC0" />}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={uploadImage}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.buttonText}>Share Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8ECAE6", // Background color
    padding: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#023047",
  },
  infoContainer: {
    flex: 2,
    marginLeft: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#023047",
  },
  friendsGroups: {
    fontSize: 16,
    color: "#219EBC",
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  editButton: {
    backgroundColor: "#FFB703",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  shareButton: {
    backgroundColor: "#FB8500",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserProfilePage;
