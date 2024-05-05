// api/Apis.js
const API_URL = 'https://mundongo-production.up.railway.app';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Autenticación
export const signUp = async (email, password, displayName, isAdmin = false) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        displayName,
        isAdmin,
      }),
    });
    if (!response.ok) throw new Error('Error en el registro');
    return response.json();
  } catch (error) {
    console.error('Error en signUp:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión');
    }
    return data;
  } catch (error) {
    throw new Error(error.message || 'Error al iniciar sesión');
  }
};



// Cuentas
export const getAllAccounts = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/account`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Error al obtener cuentas');
    return response.json();
  } catch (error) {
    console.error('Error en getAllAccounts:', error);
    throw error;
  }
};

export const getAccountById = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/api/account/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Error al obtener cuenta');
    return response.json();
  } catch (error) {
    console.error('Error en getAccountById:', error);
    throw error;
  }
};

export const createAccount = async (accountData, token) => {
  try {
    const response = await fetch(`${API_URL}/api/account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(accountData),
    });
    if (!response.ok) throw new Error('Error al crear cuenta');
    return response.json();
  } catch (error) {
    console.error('Error en createAccount:', error);
    throw error;
  }
};

export const updateAccount = async (id, accountData, token) => {
  try {
    const response = await fetch(`${API_URL}/api/account/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(accountData),
    });
    if (!response.ok) throw new Error('Error al actualizar cuenta');
    return response.json();
  } catch (error) {
    console.error('Error en updateAccount:', error);
    throw error;
  }
};

export const addCommentToAccount = async (id, commentData, token) => {
  try {
    const response = await fetch(`${API_URL}/api/account/${id}/addComment`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) throw new Error('Error al agregar comentario a cuenta');
    return response.json();
  } catch (error) {
    console.error('Error en addCommentToAccount:', error);
    throw error;
  }
};

export const deleteAccount = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/api/account/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Error al eliminar cuenta');
    return response.json();
  } catch (error) {
    console.error('Error en deleteAccount:', error);
    throw error;
  }
};

// Eventos
export const getAllEvents = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/events`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.text();
    return data ? JSON.parse(data) : []; 
  } catch (error) {
    console.error('Error en getAllEvents:', error);
    throw error;
  }
};


export const getEventById = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/api/events/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Error al obtener el evento');
    return response.json();
  } catch (error) {
    console.error('Error en getEventById:', error);
    throw error;
  }
};


export const createEvent = async (eventData, token) => {
  try {
    const response = await fetch(`${API_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error('Error al crear evento');
    return response.json();
  } catch (error) {
    console.error('Error en createEvent:', error);
    throw error;
  }
};

export const updateEvent = async (id, eventData, token) => {
  try {
    const response = await fetch(`${API_URL}/api/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error('Error al actualizar evento');
    return response.json();
  } catch (error) {
    console.error('Error en updateEvent:', error);
    throw error;
  }
};

export const deleteEvent = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/api/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const text = await response.text(); 
    console.log(text); 

    if (!response.ok) throw new Error('Error al eliminar evento');

    return JSON.parse(text); 
  } catch (error) {
    console.error('Error en deleteEvent:', error);
    throw error;
  }
};



// Tags
export const getAllTags = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/tags`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Error al obtener etiquetas');
    return response.json();
  } catch (error) {
    console.error('Error en getAllTags:', error);
    throw error;
  }
};

const handleLogin = async (email, password) => {
  try {
    const response = await login(email, password);
    if (response.token) {
      await AsyncStorage.setItem('userToken', response.token); // Guardar el token
      navigation.navigate('EventsScreen'); // Navegar a EventsScreen
    } else {
      // Manejar errores como credenciales incorrectas
      alert('Credenciales incorrectas');
    
    }
  } catch (e) {
    // Manejar errores de la petición o del servidor
  }
};

const fetchEvents = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken'); // Obtener el token
    if (token !== null) {
      const eventsData = await getAllEvents(token); // Usar el token en la petición
      setEvents(eventsData);
    } else {
      // Si no hay token, manejar el caso, por ejemplo redirigir al Login
      navigation.navigate('LoginScreen');

    }
  } catch (e) {
    // Manejar errores de la petición o del servidor
  }
};

const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('userToken'); // Eliminar el token
    navigation.navigate('LoginScreen'); // Redirigir al login
  } catch (e) {
    // Manejar errores al eliminar el token
  }
};
