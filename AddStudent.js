import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const AddStudent = ({  }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [course, setCourse] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
  }

  const addStudent = async () => {
    const newStudent = {
      ID: uuidv4(),
      firstName,
      lastName,
      course,
      username,
      password,
    };

    try {
      const existingStudents = JSON.parse(await AsyncStorage.getItem('students')) || [];
      const updatedStudents = [...existingStudents, newStudent];
      await AsyncStorage.setItem('students', JSON.stringify(updatedStudents));

      // Clear input fields
      setFirstName('');
      setLastName('');
      setCourse('');
      setUsername('');
      setPassword('');

      // Trigger the callback to update the student list in the parent component
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Course"
        value={course}
        onChangeText={setCourse}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.addButton} onPress={addStudent}>
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={clearAsyncStorage}>
        <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0E4E4',
  },
  input: {
    backgroundColor: '#FFFFFF',
    height: 40,
    borderColor: '#800080',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default AddStudent;
