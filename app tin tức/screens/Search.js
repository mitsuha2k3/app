import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../settings/Theme';
import Header from '../components/Header';

const categories = [
  'Tất cả',
  'Thể thao',
  'Khoa học',
  'Pháp luật',
  'Game'
];

export default function SearchScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, [searchQuery, selectedCategory]);

  const fetchNews = async () => {
    setLoading(true);
    let categoryQuery = '';
    switch (selectedCategory) {
      case 'Thể thao':
        categoryQuery = 'sports';
        break;
      case 'Khoa học':
        categoryQuery = 'science';
        break;
      case 'Pháp luật':
        categoryQuery = 'law';
        break;
      case 'Game':
        categoryQuery = 'game';
        break;
      default:
        categoryQuery = '';
        break;
    }

    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=5d797cbed4b0433492492cd6d7d4ec48`;
    if (categoryQuery) {
      url += `&category=${categoryQuery}`;
    }
    if (searchQuery) {
      url += `&q=${searchQuery}`;
    }

    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result.articles) {
        setNewsData(result.articles.map((article, index) => ({
          id: index.toString(),
          title: article.title,
          description: article.description,
        })));
      } else {
        setNewsData([]);
      }
    } catch (error) {
      console.error(error);
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

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
      {item.description && (
        <Text style={[styles.newsDescription, { color: theme.colors.text }]}>
          {item.description}
        </Text>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header />
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <TextInput
        style={[styles.searchInput, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="Tìm kiếm tin tức..."
        placeholderTextColor={theme.colors.placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
      />
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <FlatList
          data={newsData}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.newsList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchInput: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
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
  newsDescription: {
    fontSize: 14,
    marginTop: 5,
  },
});
