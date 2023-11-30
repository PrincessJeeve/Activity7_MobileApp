import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sHeight = Dimensions.get('window').height;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const storedStudents = await AsyncStorage.getItem('students');
      if (storedStudents) {
        const parsedStudents = JSON.parse(storedStudents).map((student, index) => ({
          ...student,
          id: (index + 1).toString(),
        }));
        setStudents(parsedStudents);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  return (
    <View style={{ height: 'auto', backgroundColor: '#BDB5D5' }}>
      {modalVisible && <View style={styles.overlay} />}
      <DataTable style={{ marginBottom: 30, backgroundColor: 'transparent' }}>
        <DataTable.Header style={{ backgroundColor: '#7F00FF' }}>
          <DataTable.Title><Text style={styles.tableColumnTitle}>#</Text></DataTable.Title>
          <DataTable.Title><Text style={styles.tableColumnTitle}>Name</Text></DataTable.Title>
          <DataTable.Title><Text style={styles.tableColumnTitle}>Course</Text></DataTable.Title>
          <DataTable.Title><Text style={styles.tableColumnTitle}>Username</Text></DataTable.Title>
        </DataTable.Header>

        <ScrollView>
          {students.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleStudentClick(item)}>
              <DataTable.Row style={styles.tableBorder}>
                <DataTable.Cell>{item.id}</DataTable.Cell>
                <DataTable.Cell>{item.lastName + ', '}{item.firstName}</DataTable.Cell>
                <DataTable.Cell>{item.course}</DataTable.Cell>
                <DataTable.Cell>{item.username}</DataTable.Cell>
              </DataTable.Row>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modTitle}>Student Information</Text>
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.modData}>{`First Name: ${selectedStudent?.firstName}`}</Text>
                <Text style={styles.modData}>{`Last Name: ${selectedStudent?.lastName}`}</Text>
                <Text style={styles.modData}>{`Course: ${selectedStudent?.course}`}</Text>
              </View>
              <View>
                <Text style={styles.modData}>{`Username: ${selectedStudent?.username}`}</Text>
                <Text style={styles.modData}>{`Password: ${selectedStudent?.password}`}</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View style={styles.closeButtonContainer}>
                  <Text style={styles.closeButton}>CLOSE</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  tableBorder: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#7F00FF',
  },
  tableColumnTitle: {
    textAlign: 'center',
    fontSize: 15,
    justifyContent: 'center',
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#E6D5E6', // Pastel purple
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modTitle: {
    fontSize: 18,
    marginBottom: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modData: {
    fontSize: 18,
    marginBottom: 15,
  },
  closeButtonContainer: {
    backgroundColor: '#7F00FF', // Purple
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  closeButton: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StudentList;
