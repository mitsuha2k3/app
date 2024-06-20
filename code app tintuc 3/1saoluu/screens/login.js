import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { useTheme } from '../settings/Theme'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'

export default function LoginScreen() {
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const navigation = useNavigation();

  const handleLogin = () => {
    // Phần xử lý đăng nhập
    // console.log('Email:', email)
    // console.log('Password:', password)
    setLoggedIn(true)
    navigation.navigate('Người dùng')
    }
  const handleRegister = () => {
    navigation.navigate('Đăng ký')
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
        placeholder="Địa chỉ Email"
        placeholderTextColor={theme.colors.text}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1, backgroundColor: theme.colors.card, color: theme.colors.text }]}
          placeholder="Mật khẩu"
          placeholderTextColor={theme.colors.text}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.loginButton, { backgroundColor: theme.colors.primary }]} onPress={handleLogin}>
        <Text style={[styles.loginButtonText, { color: theme.colors.text }]}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.registerButton, { backgroundColor: theme.colors.primary }]} onPress={handleRegister}>
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 50,
    marginTop: 50,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  registerButton: {
    width: 200,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 18,
  },
});
