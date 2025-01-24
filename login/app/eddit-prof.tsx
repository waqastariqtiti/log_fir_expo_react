import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Modal, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For pen and back arrow icons
import { Picker } from "@react-native-picker/picker"; // Correct import
import * as ImagePicker from "expo-image-picker";
import { ref, set } from "firebase/database";
import { storage, database } from "../firebase.config"; // Import Firebase config

const EditProfilePage = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null); // State for profile image
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [gender, setGender] = useState("Male"); // Default gender selected

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access the media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Keep it a square shape
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const uploadProfileImage = async () => {
    if (!profileImage) return;

    try {
      const response = await fetch(profileImage);
      const blob = await response.blob();
      const imageRef = storage.ref().child(`profile_images/${Date.now()}.jpg`);
      const uploadTask = imageRef.put(blob);

      uploadTask.then(() => {
        imageRef.getDownloadURL().then((url) => {
          const userRef = ref(database, "users/" + "user123"); // Use actual user ID
          set(userRef, {
            profileImage: url,
            username,
            name,
            description,
            pronoun,
            gender,
          }).then(() => {
            Alert.alert("Success", "Profile updated successfully!");
          });
        });
      });
    } catch (error) {
      Alert.alert("Error", "Failed to upload image.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => console.log("Navigate to profile")}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.backButtonText}>Back</Text>
      </View>

      {/* Profile Image Section */}
      <View style={styles.imageContainer}>
        <View style={styles.imageBar}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="pencil" size={24} color="#ffffff" style={styles.penIcon} />
          </TouchableOpacity>
          <Image
            source={profileImage ? { uri: profileImage } : { uri: "https://placekitten.com/200/200" }}
            style={styles.profileImage}
          />
        </View>
      </View>

      {/* Modal for Image Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.modalOption}>Upload from Computer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.modalOption}>Upload from Online</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Profile Form */}
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

        {/* Gender Select Dropdown */}
        <View style={styles.pickerContainer}>
          <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)} style={styles.picker}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={uploadProfileImage}>
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
    width: 200,
    height: 200,
    borderRadius: 100,
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
    backgroundColor: "rgb(255, 183, 3)",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfilePage;
