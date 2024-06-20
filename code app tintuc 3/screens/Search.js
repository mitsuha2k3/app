import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../settings/Theme';
import Header from '../components/Header';

const categories = [
  'Tất cả',
  'Thể thao',
  'Tin trong nước',
  'Tin thế giới',
  'Thời tiết',
  'Khoa học',
  'Pháp luật',
  'Game'
];

export default function SearchScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    // logic tìm kiếm
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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header />
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <TextInput
        style={[styles.searchInput, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="Tìm kiém tin tức..."
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
      {/* Kết quả tìm kiếm*/}
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
});
