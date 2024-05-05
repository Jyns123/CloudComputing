import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllEvents } from '../../api/Apis';

const EventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchEvents();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchEvents = async () => {
    setIsFetching(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token obtenido:', token);
      if (token) {
        const eventsData = await getAllEvents(token);
        setEvents(eventsData);
      } else {
        Alert.alert('Error', 'No se ha podido verificar el usuario');
        console.log('Token no disponible o inválido:', token);
      }
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      Alert.alert('Error', `No se pudieron obtener los eventos. Detalles del error: ${error.message}`);
    }
    setIsFetching(false);
  };

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.reset({
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión. Detalles del error: ' + error.message);
    }
  };

  return (
    <ImageBackground source={require('../../assets/BG.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {isFetching ? (
          <Text style={styles.loadingText}>Cargando eventos...</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.eventList}>
            {events.map((item) => (
              <View style={styles.eventItem} key={item.id}>
                <Text style={styles.eventName}>{item.name}</Text>
                <Button
                  title="Ver detalles"
                  onPress={() => navigation.navigate('EventDetails', { id: item.id })}
                  color="#2D00FF"
                />
              </View>
            ))}
          </ScrollView>
        )}
        <TouchableOpacity onPress={handleLogOut} style={styles.logOutButton}>
          <Text style={styles.logOutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#2D00FF',
  },
  eventList: {
    alignItems: 'center',
  },
  eventItem: {
    width: '100%',
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(12, 1, 63, 0.8)',
    borderRadius: 8,
    elevation: 5,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2D00FF',
  },
  logOutButton: {
    alignSelf: 'center',
    marginTop: 16,
  },
  logOutText: {
    color: 'white',
    fontSize: 18,
  },
});

export default EventsScreen;
