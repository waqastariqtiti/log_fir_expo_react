import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

const AddEditNoteScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(['Work', 'Personal', 'Important']);
  const [selectedTag, setSelectedTag] = useState('');
  const [showTagModal, setShowTagModal] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [fadeAnim] = useState(new Animated.Value(0));
  const router = useRouter();

  const handleSaveNote = () => {
    if (!title || !content) {
      alert('Title and content cannot be empty!');
      return;
    }
    console.log('Note Saved:', { title, content, selectedTag, reminderDate });
    router.push('/notes_organization/Home_Note');
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag.trim()]);
      setSelectedTag(newTag.trim());
      setNewTag('');
      setShowTagModal(false);
    } else if (tags.includes(newTag.trim())) {
      alert('Tag already exists!');
    }
  };

  const renderTagItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedTag(item);
        setShowTagModal(false);
      }}
      style={[
        styles.tagItem,
        { backgroundColor: selectedTag === item ? 'rgb(2, 48, 71)' : 'rgb(33, 158, 188)' },
      ]}
    >
      <Text style={styles.tagText}>{item}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
        <Text style={styles.header}>Add / Edit Note</Text>

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          multiline
        />

        <TouchableOpacity
          style={styles.tagSelector}
          onPress={() => setShowTagModal(true)}
        >
          <Text style={styles.tagText}>
            {selectedTag || 'Select or Create a Tag'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reminderButton}
          onPress={() => setDatePickerVisibility(true)}
        >
          <Text style={styles.reminderText}>
            {reminderDate
              ? `Reminder: ${reminderDate.toLocaleString()}`
              : 'Set Reminder'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
          <Text style={styles.saveButtonText}>Save Note</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Tag Modal */}
      <Modal visible={showTagModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select or Create a Tag</Text>
            <FlatList
              data={tags}
              renderItem={renderTagItem}
              keyExtractor={(item) => item}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="New Tag"
              value={newTag}
              onChangeText={setNewTag}
            />
            <TouchableOpacity style={styles.addTagButton} onPress={handleAddTag}>
              <Text style={styles.addTagText}>Add Tag</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowTagModal(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* DateTime Picker */}
      {isDatePickerVisible && (
        <DateTimePicker
          value={reminderDate || new Date()}
          mode="datetime"
          display="default"
          onChange={(event, date) => {
            if (date) setReminderDate(date);
            setDatePickerVisibility(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(33, 158, 188)',
    padding: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'rgb(2, 48, 71)',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgb(251, 133, 0)',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'rgb(33, 158, 188)',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  tagSelector: {
    padding: 10,
    backgroundColor: 'rgb(33, 158, 188)',
    borderRadius: 5,
    marginBottom: 15,
  },
  tagText: {
    color: 'white',
    fontSize: 16,
  },
  reminderButton: {
    padding: 10,
    backgroundColor: 'rgb(251, 133, 0)',
    borderRadius: 5,
    marginBottom: 15,
  },
  reminderText: {
    color: 'white',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'rgb(2, 48, 71)',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(33, 158, 188)',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  addTagButton: {
    backgroundColor: 'rgb(33, 158, 188)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addTagText: {
    color: 'white',
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgb(2, 48, 71)',
    borderRadius: 5,
  },
  modalCloseText: {
    color: 'white',
    fontSize: 16,
  },
  tagItem: {
    padding: 10,
    backgroundColor: 'rgb(33, 158, 188)',
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default AddEditNoteScreen;
