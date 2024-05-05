import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet, ImageBackground, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEventById, deleteEvent } from '../../api/Apis';

const EventDetailsScreen = ({ route }) => {
  const [event, setEvent] = useState(null);
  const { id } = route.params;

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const eventData = await getEventById(id, token);
          setEvent(eventData);
        } else {
          Alert.alert('Error', 'Token no disponible');
        }
      } catch (error) {
        console.error('Error al obtener detalles del evento:', error);
        Alert.alert('Error', 'No se pudo obtener información del evento');
      }
    };
  

    fetchEventDetails();
  }, [id]);
  const renderComments = () => {
    if (event.comments && event.comments.length > 0) {
      return event.comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <Text style={styles.commentAuthor}>{comment.author}</Text>
          <Text style={styles.commentContent}>{comment.content}</Text>
          <Text style={styles.commentDate}>{comment.date}</Text>
        </View>
      ));
    }
    return <Text style={styles.noComments}>No hay comentarios aún</Text>;
  };
  
  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        await deleteEvent(id, token);
        navigation.goBack(); 
      } else {
        Alert.alert('Error', 'Token no disponible');
      }
    } catch (error) {
      Alert.alert('Error al eliminar el evento', error.message);
    }
  };

  if (!event) {
    return <Text>Cargando...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={{ uri: event.imageUrl || 'https://picsum.photos/1920/1080' }} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.eventDate}>Fecha: {event.date}</Text>
          <Text style={styles.eventLocation}>País: {event.country}</Text>
          <Text style={styles.eventLocation}>Ciudad: {event.city}</Text>

          <Text style={styles.eventDescription}>Descripción: {event.description}</Text>
          <Text style={styles.commentsHeader}>Comentarios:</Text>
          {renderComments()}

        </View>
      </ImageBackground>
      <Button title="Eliminar Evento" onPress={handleDelete} color="red" />

    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%', 
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    width: '100%',
  },
  eventName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  eventDate: {
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 18,
    color: 'white',
    marginBottom: 16,
  },
  commentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
  commentContent: {
    color: '#333',
  },
  commentDate: {
    color: '#666',
    fontSize: 12,
    textAlign: 'right',
  },
  noComments: {
    color: 'white',
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
});

export default EventDetailsScreen;
