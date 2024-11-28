import AsyncStorage from '@react-native-async-storage/async-storage';
import {articles} from "./index";

export default [
  {
    title: 'Ice cream is made with carrageenan …',
    image: 'assets/imgs/coffee_1.jpg',
    cta: 'View article', 
    horizontal: true
  },
  {
    title: 'Is makeup one of your daily esse …',
    image: 'https://source.unsplash.com/rKYRJu0n06Y',
    cta: 'View article'
  },
  {
    title: 'Coffee is more than just a drink: It’s …',
    image: 'https://unsplash.com/photos/coffee-beans-on-gray-steel-wok-rKYRJu0n06Y?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash',
    cta: 'View article' 
  },
  {
    title: 'Fashion is a popular style, especially in …',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1326&q=80',
    cta: 'View article' 
  },
  {
    title: 'Argon is a great free UI packag …',
    image: 'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?fit=crop&w=1947&q=80',
    cta: 'View article', 
    horizontal: true
  },
];

// Menyimpan data ke AsyncStorage
const storeData = async () => {
  try {
    await AsyncStorage.setItem('@articles_key', JSON.stringify(articles));
  } catch (e) {
    console.error("Error storing data", e);
  }
};

// Memanggil fungsi untuk menyimpan data
storeData().then(r => {});