import ReactNativeBiometrics from 'react-native-biometrics'

const rnBiometrics = new ReactNativeBiometrics()

export const biometricLogin = async () => {

  const { success } = await rnBiometrics.simplePrompt({
    promptMessage: "Login with Biometrics"
  })

  return success
}