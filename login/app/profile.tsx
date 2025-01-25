import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { ref, get } from "firebase/database";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../firebase.config";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const UserProfilePage = ({ navigation }: { navigation: any }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState("Loading...");
  const [friendsCount, setFriendsCount] = useState(0);
  const [groupsCount, setGroupsCount] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        Alert.alert("Error", "No user signed in!");
      }
    });
    return unsubscribe; // Cleanup listener on unmount
  }, []);

  const fetchUserData = async (userId: string) => {
    const userRef = ref(database, `users/${userId}`);
    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUsername(data.username || "No username");
        setProfileImage(data.profileImage || null);
        setFriendsCount(data.friendsCount || 0);
        setGroupsCount(data.groupsCount || 0);
      } else {
        Alert.alert("Error", "User data not found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "Failed to fetch user data.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/Login");
      Alert.alert("Success", "You have been logged out.");
    } catch (error) {
      Alert.alert("Error", "Failed to log out.");
    }
  };

  const handleScreenPress = () => {
    if (dropdownVisible) {
      setDropdownVisible(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container}>
        {/* Dropdown Menu */}
        {dropdownVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity
            onPress={() => setDropdownVisible(!dropdownVisible)}
            style={styles.dropdownTrigger}
          >
            <Text style={styles.userName}>{username} ▼</Text>
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : {
                      uri: "https://static.vecteezy.com/system/resources/previews/003/715/527/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg",
                    }
              }
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.userHandle}>@{username}</Text>
              <Text style={styles.userStats}>
                Friends: {friendsCount} &nbsp;&nbsp;&nbsp; Groups: {groupsCount}
              </Text>
            </View>
          </View>
          {/* Description Bar */}
          <View style={styles.descriptionBar}>
            <Text style={styles.descriptionText}>No description</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push("editProf")}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.buttonText}>Share Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Navbar */}
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navIcon}>
            <Ionicons name="document-text" size={30} color="#023047" />
            <Text style={styles.navLabel}>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIcon}>
            <Ionicons name="image" size={30} color="#023047" />
            <Text style={styles.navLabel}>Media</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIcon}>
            <Ionicons name="musical-notes" size={30} color="#023047" />
            <Text style={styles.navLabel}>Music</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8ECAE6",
    padding: 10,
  },
  profileSection: {
    marginTop: 20,
    position: "relative",
  },
  dropdownTrigger: {
    position: "absolute",
    top: 0,
    left: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#023047",
    marginTop: 0,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#023047",
  },
  userHandle: {
    fontSize: 16,
    color: "#023047",
    marginLeft: 10,
  },
  userStats: {
    fontSize: 14,
    color: "#023047",
    marginLeft: 10,
    marginTop: 5,
  },
  descriptionBar: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#8ECAE6",
    borderRadius: 5,
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 14,
    color: "#023047",
  },
  dropdown: {
    position: "absolute",
    top: 30,
    left: 10,
    backgroundColor: "#FFB703",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    zIndex: 100,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#FFB703",
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
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
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "#8ECAE6",
    borderTopWidth: 1,
    borderColor: "#023047",
  },
  navIcon: {
    alignItems: "center",
  },
  navLabel: {
    marginTop: 5,
    fontSize: 12,
    color: "#023047",
  },
});

export default UserProfilePage;
