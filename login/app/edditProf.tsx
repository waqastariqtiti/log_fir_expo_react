import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Modal, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Firebase Firestore
import { useRouter } from "expo-router"; // For navigation
import { Picker } from '@react-native-picker/picker'; // Correct import for Picker

const EditProfilePage = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null); // State for profile image
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [gender, setGender] = useState("Male"); // Default gender selected
  const [url, setUrl] = useState(""); // URL for online image
  const [loading, setLoading] = useState(true);
  const [isOnlineUpload, setIsOnlineUpload] = useState(false); // State to toggle visibility of TextInput

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      setLoading(false); // Assume we're not loading if the user is logged in
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access the media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const uploadProfileImage = async (imageUri: string | null) => {
    console.log("Image URI:", imageUri); // Log the URI to check
    if (!imageUri || !currentUser?.uid) return; // Ensure currentUser and uid are valid

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storage = getStorage();
      const imagePath = `profile_images/${currentUser.uid}/${Date.now()}.jpg`;
      const imageRef = storageRef(storage, imagePath);

      await uploadBytes(imageRef, blob);
      const url = await getDownloadURL(imageRef);

      // Now save the user data along with the profile image URL
      const db = getFirestore();
      const userDocRef = doc(db, "users", currentUser.uid); // Use currentUser.uid to reference the document
      await setDoc(userDocRef, {
        profileImage: url,
        username,
        name,
        description,
        pronoun,
        gender,
      });

      setModalVisible(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error uploading profile image:", error);
      Alert.alert("Error", "Failed to upload profile image.");
    }
  };

  const handleUrlUpload = async () => {
    if (url) {
      try {
        const validUrl = new URL(url);
        setProfileImage(url); // Set URL directly if it's valid
      } catch (error) {
        Alert.alert("Error", "Invalid URL.");
      }
    }
  };

  const saveProfile = async () => {
    await uploadProfileImage(profileImage);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setIsOnlineUpload(false);
    setUrl("");
  };

  if (loading) {
    return <Text>Loading...</Text>; // Show loading state while fetching data
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.backButtonText}>Back</Text>
      </View>

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.imageBar}>
            <Ionicons name="pencil" size={24} color="#ffffff" style={styles.penIcon} />
            <Image
              source={profileImage ? { uri: profileImage } : { uri: "https://static.vecteezy.com/system/resources/previews/003/715/527/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg" }}
              style={styles.profileImage}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.usernameText}>Hello @{username}</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Image
              source={profileImage ? { uri: profileImage } : { uri: "https://static.vecteezy.com/system/resources/previews/003/715/527/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg" }}
              style={styles.profileImage}
            />
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.modalOption}>Upload from Device</Text>
            </TouchableOpacity>
            <View style={styles.modalDivider}></View>
            <TouchableOpacity onPress={() => setIsOnlineUpload(true)}>
              <Text style={styles.modalOption}>Upload Online</Text>
            </TouchableOpacity>

            {/* Conditionally render TextInput based on isOnlineUpload state */}
            {isOnlineUpload && (
              <TextInput
                style={styles.input}
                placeholder="Enter Image URL"
                value={url}
                onChangeText={setUrl}
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleUrlUpload} style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Pronoun"
          value={pronoun}
          onChangeText={setPronoun}
        />

        <View style={styles.pickerContainer}>
          <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)} style={styles.picker}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(142, 202, 230)",
    padding: 20,
  },
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: "#ffffff",
    marginLeft: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  imageBar: {
    borderRadius: 150,
    borderWidth: 10,
    borderColor: "rgb(33, 158, 188)",
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  penIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgb(251, 133, 0)",
    padding: 8,
    borderRadius: 50,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: "center",
  },
  modalOption: {
    fontSize: 16,
    marginBottom: 15,
    color: "rgb(2, 48, 71)",
    backgroundColor: 'rgb(255, 183, 3)',
    width: 200,
    height: 30,
    textAlign: 'center',
    borderRadius: 4,
    marginTop: 10,
  },
  modalDivider: {
    height: 1,
    width: "100%",
    backgroundColor: "rgb(33, 158, 188)",
    marginVertical: 10,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
  },
  applyButton: {
    backgroundColor: "rgb(33, 158, 188)",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "rgb(200, 50, 50)",
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  usernameText: {
    fontSize: 18,
    color: "rgb(2, 48, 71)",
    marginTop: 10,
    textAlign: "center",
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    height: 45,
    borderColor: "rgb(33, 158, 188)",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderColor: "rgb(33, 158, 188)",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 45,
    color: "rgb(33, 158, 188)",
  },
  saveButton: {
    backgroundColor: "rgb(33, 158, 188)",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default EditProfilePage;
