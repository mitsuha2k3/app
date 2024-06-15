import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../settings/Theme';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleRegister = () => {
    // logic đăng ký
    navigation.navigate('Đăng nhập');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Đăng ký tài khoản mới</Text>
      
      
      {/*  */}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  registerButton: {
    width: 200,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
  },
});
