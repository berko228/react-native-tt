import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Switch} from 'react-native';
import HeartIcon from '../../assets/HeartIcon';
import {LikedPerson, ResultsPerson} from '../../types/types';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
interface PersonProps {
  navigation: NavigationProp<ParamListBase>;
  person: ResultsPerson;
  likePersons: LikedPerson[];
  onLike: (name: string, gender: string) => void;
}

export const Person: React.FC<PersonProps> = ({
  navigation,
  person,
  likePersons,
  onLike,
}) => {
  const navigate = () => navigation.navigate('PersonModal', {person});

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigate()}>
      <TouchableOpacity onPress={() => onLike(person.name, person.gender)}>
        <HeartIcon
          fillColor={
            likePersons?.some(item => item.name === person.name)
              ? 'red'
              : 'none'
          }
          strokeColor={'black'}
        />
      </TouchableOpacity>
      <Text style={[styles.text, {width: '40%', marginLeft: 20}]}>
        {person.name}
      </Text>
      <Text style={styles.text}>{person.birth_year}</Text>
      <Text style={[styles.text, {justifyContent: 'flex-end'}]}>
        {person.gender === 'n/a' ? '' : person.gender}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  text: {
    width: '33%',
    justifyContent: 'flex-end',
  },
});
