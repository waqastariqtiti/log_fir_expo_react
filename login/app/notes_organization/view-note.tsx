// app/view-note.tsx

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons

const ViewNoteScreen = () => {
  // Example note data (replace with your actual data or state management)
  const noteData = {
    title: "Example Note",
    content: "This is the content of the note.",
    tags: ["Important", "Work", "Urgent"]
  };

  const handleDeleteNote = () => {
    // Show confirmation alert for deleting note
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: () => {
          // Logic for deleting note, e.g., remove from a list or database
          console.log('Note Deleted');
          // Navigation logic should go here (e.g., navigate back)
        },
      },
    ]);
  };

  const handleEditNote = () => {
    // Logic to navigate to Edit Note screen
    // Navigation logic should go here (e.g., navigate to the Edit screen)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>View Note</Text>

      {/* Display Note */}
      <View style={styles.noteContainer}>
        <Text style={styles.title}>{noteData.title}</Text>
        <Text style={styles.content}>{noteData.content}</Text>
        <Text style={styles.tags}>
          {noteData.tags.length > 0 ? `Tags: ${noteData.tags.join(', ')}` : 'No Tags'}
        </Text>
      </View>

      {/* Edit/Delete Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditNote}>
          <Ionicons name="pencil" size={20} color="white" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteNote}>
          <Ionicons name="trash" size={20} color="white" />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(242, 202, 230)', // Soft background color
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgb(2, 48, 71)', // Dark greenish color for header
    marginBottom: 20,
    textAlign: 'center',
  },
  noteContainer: {
    backgroundColor: 'rgb(255, 183, 3)', // Yellowish background for the note content
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(33, 158, 188)', // Blue color for the title
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: 'rgb(2, 48, 71)', // Dark greenish color for content text
    marginBottom: 10,
  },
  tags: {
    fontSize: 14,
    color: 'rgb(33, 158, 188)', // Blue color for tags text
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(33, 158, 188)', // Blue color for the edit button
    padding: 10,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(251, 133, 0)', // Orange color for delete button
    padding: 10,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ViewNoteScreen;
