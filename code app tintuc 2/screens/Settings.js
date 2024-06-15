import React, { useState } from 'react'
import {  StyleSheet, Text, View, 
          TouchableOpacity, LayoutAnimation, 
          UIManager, Platform 
        } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from '../settings/Theme'
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/Ionicons'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const [expandedNotification, setExpandedNotification] = useState(false);
  const [expandedContent, setExpandedContent] = useState(false);

  const handlePressNotification = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedNotification(!expandedNotification);
  };

  const handlePressContent = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedContent(!expandedContent);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header />
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.primary }]} 
          onPress={toggleTheme}
        >
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>Giao diện sáng/tối</Text>
          <Icon name="sunny-outline" size={24} color={theme.colors.text} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.primary }]} 
          onPress={handlePressNotification}>
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>Thông báo đẩy</Text>
          <Icon name={expandedNotification ? "chevron-up-outline" : "chevron-down-outline"} size={24} color={theme.colors.text} style={styles.icon} />
        </TouchableOpacity>
        {expandedNotification && (
          <View style={styles.expandedSection}>
            <TouchableOpacity style={[styles.subButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Bật/Tắt thông báo ứng dụng</Text>
              <Icon name="notifications-outline" size={24} color={theme.colors.text} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Tin tức trong nước</Text>
              <Icon name="earth-outline" size={24} color={theme.colors.text} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Tin tức thế giới</Text>
              <Icon name="earth-outline" size={24} color={theme.colors.text} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Thông báo về thời tiết</Text>
              <Icon name="cloudy-night-outline" size={24} color={theme.colors.text} style={styles.icon} />
            </TouchableOpacity>
            {/*  */}
          </View>
        )}

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.primary }]} 
          onPress={handlePressContent}
        >
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>Cài đặt nội dung</Text>
          <Icon name={expandedContent ? "chevron-up-outline" : "chevron-down-outline"} size={24} color={theme.colors.text} style={styles.icon} />
        </TouchableOpacity>

        {expandedContent && (
          <View style={styles.expandedSection}>
            <TouchableOpacity style={[styles.subButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Tin thể thao</Text>
              <Icon name="football-outline" size={24} color={theme.colors.text} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Tin tức trong nước</Text>
              <Icon name="earth-outline" size={24} color={theme.colors.text} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Tin tức thế giới</Text>
              <Icon name="earth-outline" size={24} color={theme.colors.text} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Thời tiết</Text>
              <Icon name="cloudy-night-outline" size={24} color={theme.colors.text} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Khoa học</Text>
              <Icon name="telescope-outline" size={24} color={theme.colors.text} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Pháp luật</Text>
              <Icon name="school-outline" size={24} color={theme.colors.text} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subButton, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Game</Text>
              <Icon name="game-controller-outline" size={24} color={theme.colors.text} style={styles.icon} />
            </TouchableOpacity>
            {/*  */}
          </View>
        )}

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.primary }]} 
          onPress={() => { /* Nút báo cáo, hỗ trợ,... */ }}>
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>Báo cáo, hỗ trợ, góp ý</Text>
          <Icon name="list-outline" size={24} color={theme.colors.text} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.primary }]} 
          onPress={() => { /* nút ngôn ngữ */ }}>
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>Ngôn ngữ</Text>
          <Icon name="text-outline" size={24} color={theme.colors.text} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.primary }]} 
          onPress={() => { /* Giới thiệu app */ }}>
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>Giới thiệu ứng dụng</Text>
          <Icon name="sunny-outline" size={24} color={theme.colors.text} style={styles.icon} />
        </TouchableOpacity>
        {/**/}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]} 
          onPress={() => { /* Chức năng nút test */ }}>
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>Test</Text>
        </TouchableOpacity>
        {/* // Nút em thêm để test, */}
     </View>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  subButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 20,
  },
  expandedSection: {
    paddingLeft: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
  },
});
