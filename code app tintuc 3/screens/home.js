import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../settings/Theme';
import Header from '../components/Header';

const categories = [
  'All',
  'Technology',
  'Business',
  'Health',
  'Sports',
  'Entertainment',
  'Science',
];

const newsData = [
  // Dữ liệu mẫu, thay thế bằng dữ liệu thật
  { id: '1', title: 'News Title 1', category: 'Technology' },
  { id: '2', title: 'News Title 2', category: 'Business' },
  { id: '3', title: 'News Title 3', category: 'Health' },
  // Thêm các bài tin tức khác
];

export default function HomeScreen() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const filteredNews = selectedCategory === 'All'
    ? newsData
    : newsData.filter(news => news.category === selectedCategory);

  const renderCategory = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item)}>
      <Text style={[
        styles.category,
        { color: item === selectedCategory ? theme.colors.primary : theme.colors.text },
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderNewsItem = ({ item }) => (
    <View style={[styles.newsItem, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.newsTitle, { color: theme.colors.text }]}>{item.title}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header />
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
      />
      <FlatList
        data={filteredNews}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.newsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  categoryList: {
    flexGrow: 0,
    marginVertical: 10,
  },
  category: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  newsList: {
    alignItems: 'center',
  },
  newsItem: {
    width: '90%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  newsTitle: {
    fontSize: 18,
  },
});
