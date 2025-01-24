import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icon

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

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

      {/* Add Note Card Section */}
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>Add Note</Text>
      </View>
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
  // New Card Styles
  cardContainer: {
    flex: 1,
    justifyContent: 'center', // Centering the card vertically
    alignItems: 'center', // Centering the card horizontally
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
