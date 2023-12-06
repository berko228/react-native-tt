import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {LikedPerson} from '../../types/types';

type Props = {
  favorites: LikedPerson[];
  handleFavoritesReset: () => void;
};

export const FansGenderTable = ({favorites, handleFavoritesReset}: Props) => {
  const getCountByGender = (gender: string) => {
    if (gender === 'others') {
      return favorites.filter(
        person => person.gender !== 'male' && person.gender !== 'female',
      ).length;
    } else {
      return favorites.filter(person => person.gender === gender).length;
    }
  };

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.infoWrapper}>
        <Text style={styles.title}>Fans</Text>
        <TouchableOpacity style={styles.button} onPress={handleFavoritesReset}>
          <Text style={styles.buttonText}>Clear Fans</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.boardContainer}>
        <View style={[styles.cell, {borderColor: 'pink'}]}>
          <Text style={styles.count}>{getCountByGender('female')}</Text>
          <Text>Female Fans</Text>
        </View>
        <View style={[styles.cell, {borderColor: 'lightblue'}]}>
          <Text style={styles.count}>{getCountByGender('male')}</Text>
          <Text>Male Fans</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.count}>{getCountByGender('others')}</Text>
          <Text>Others</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'column',
    gap: 15,
  },
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 7,
    padding: 5,
  },
  buttonText: {
    color: 'red',
  },
  boardContainer: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cell: {
    width: 90,
    height: 60,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  count: {
    fontSize: 20,
    color: 'black',
  },
});
