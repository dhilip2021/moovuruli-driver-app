import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('auth_token', token);
  } catch (error) {
    console.log("Token Save Error:", error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('auth_token');
  } catch (error) {
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('auth_token');
  } catch (error) {
    console.log("Token Remove Error:", error);
  }
};