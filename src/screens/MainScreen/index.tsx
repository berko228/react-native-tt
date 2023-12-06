import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useGetPeople from '../../hooks/useGetPeople';
import {Pagination} from '../../components/Pagination';
import {Person} from '../../components/Person';
import HeartIcon from '../../assets/HeartIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LikedPerson, ResultsPerson} from '../../types/types';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {FansGenderTable} from '../../components/FansGenderTable';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

export const MainScreen = ({navigation}: Props) => {
  const [favorites, setFavorites] = useState<LikedPerson[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const {isLoading, data: peopleList, error} = useGetPeople(currentPage);

  const getFavotitesList = async () => {
    const value = await AsyncStorage.getItem('favorites');
    if (value) {
      setFavorites(JSON.parse(value));
    } else {
      setFavorites([]);
    }
  };

  useEffect(() => {
    getFavotitesList();
  }, [currentPage]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavotitesList();
    });

    return unsubscribe;
  }, [navigation]);

  const handleLike = async (name: string, gender: string) => {
    if (favorites.some(item => item.name === name)) {
      const dataToSet = favorites.filter(item => item.name !== name);
      await AsyncStorage.setItem('favorites', JSON.stringify(dataToSet));
      setFavorites(dataToSet);
    } else {
      const dataToSet = [...favorites, {name: name, gender: gender}];
      await AsyncStorage.setItem('favorites', JSON.stringify(dataToSet));
      setFavorites(dataToSet);
    }
  };

  const handleFavoritesReset = async () => {
    await AsyncStorage.clear();
    setFavorites([]);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FansGenderTable
        favorites={favorites}
        handleFavoritesReset={handleFavoritesReset}
      />
      <View style={styles.table}>
        <HeartIcon fillColor={'black'} strokeColor={'black'} />
        <Text>Name</Text>
        <Text>Birth Year</Text>
        <Text>Gender</Text>
      </View>
      <View>
        {peopleList?.results?.map((person: ResultsPerson, index: number) => (
          <Person
            navigation={navigation}
            person={person}
            likePersons={favorites}
            onLike={handleLike}
            key={index}
          />
        ))}
      </View>
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalItems={peopleList.count}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#f6f5f3',
    paddingTop: 110,
    paddingHorizontal: 24,
    flex: 1,
  },
  table: {
    flexDirection: 'row',
    gap: 55,
    marginBottom: 20,
    paddingTop: 20,
  },
});
