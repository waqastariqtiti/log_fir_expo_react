// app/home.tsx

import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native'; // Ensure Text is imported
import { Ionicons } from '@expo/vector-icons'; // For icon
import { useRouter } from 'expo-router'; // Import for navigation

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const router = useRouter(); // Initialize router for navigation

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Note Organization</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="notifications-outline" size={24} color="rgb(142, 202, 230)" />
          <Ionicons
            name="settings-outline"
            size={24}
            color="rgb(142, 202, 230)"
            style={styles.icon}
          />
        </View>
      </View>

      {/* Main Search Section */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by title..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/notes_organization/add&delete')} // Navigate to Add & Delete Note page
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'rgb(2, 48, 71)', // Dark greenish color for header
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'rgb(255, 183, 3)', // Yellowish color for title
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
  searchSection: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'rgb(2, 48, 71)', // Floating action button color
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default HomeScreen;
