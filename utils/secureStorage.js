import * as Keychain from 'react-native-keychain'

export const saveToken = async (token) => {
  await Keychain.setGenericPassword("auth", token)
}

export const getToken = async () => {
  const credentials = await Keychain.getGenericPassword()

  if (credentials) {
    return credentials.password
  }

  return null
}

export const removeToken = async () => {
  await Keychain.resetGenericPassword()
}