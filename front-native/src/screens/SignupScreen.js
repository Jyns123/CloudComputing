import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ImageBackground } from 'react-native';
import { signUp } from '../../api/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await signUp(email, password, displayName);
      if (response.token) {
  
        await AsyncStorage.setItem('userToken', response.token);
        navigation.navigate('Events');
      } else {
        Alert.alert('Error', 'No se pudo crear el usuario');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema en el registro. Por favor, inténtalo de nuevo.');
      console.error('Error en el registro:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/leaves.jpg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Nombre de usuario"
          value={displayName}
          onChangeText={setDisplayName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Registrarse" onPress={handleSignUp} />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    backgroundColor: 'white',
    width: 300,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default SignUpScreen;
