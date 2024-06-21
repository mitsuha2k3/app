import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
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

export default function HomeScreen() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [newsData, setNewsData] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
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
    if (categoryQuery !== '') {
      url += `&category=${categoryQuery}`;
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
      setError('Failed to fetch news');
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const handleArticlePress = (article) => {
    setSelectedArticle(article);
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
    <TouchableOpacity onPress={() => handleArticlePress(item)}>
      <View style={[styles.newsItem, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.newsTitle, { color: theme.colors.text }]}>{item.title}</Text>
        {item.description && (
          <Text style={[styles.newsDescription, { color: theme.colors.text }]}>
            {item.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
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
      {error && (
        <Text style={{ color: 'red' }}>{error}</Text>
      )}
      {selectedArticle && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedArticle}
          onRequestClose={() => setSelectedArticle(null)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
              <Text style={[styles.newsTitle, { color: theme.colors.text }]}>
                {selectedArticle.title}
              </Text>
              {selectedArticle.description && (
                <Text style={[styles.newsDescription, { color: theme.colors.text }]}>
                  {selectedArticle.description}
                </Text>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedArticle(null)}
              >
                <Text style={{ color: theme.colors.primary }}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 15,
  },
});
