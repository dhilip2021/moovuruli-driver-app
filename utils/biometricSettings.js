import AsyncStorage from "@react-native-async-storage/async-storage";

export const setBiometricEnabled = async (value) => {
  await AsyncStorage.setItem("biometric_enabled", JSON.stringify(value));
};

export const getBiometricEnabled = async () => {
  const value = await AsyncStorage.getItem("biometric_enabled");
  return value ? JSON.parse(value) : false;
};