import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useTheme } from '../settings/Theme'

export default function Header() {
  const { theme } = useTheme()

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={[styles.brandName, { color: theme.colors.text }]}>Ứng dụng tin tức</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: 90,
    height: 28,
    marginRight: 10,
    
  },
  brandName: {
    fontSize: 23,
    fontWeight: 'bold',
  },
});
