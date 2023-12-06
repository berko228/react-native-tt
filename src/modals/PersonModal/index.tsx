import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import usePlanetData from '../../hooks/usePlanetData';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {ResultsPerson} from '../../types/types';

interface PersonModalProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase, 'PersonModal'> & {
    params: ResultsPerson | any;
  };
}

export const PersonModal: React.FC<PersonModalProps> = ({
  navigation,
  route,
}) => {
  const {person} = route.params;
  const {planetData, loading, error} = usePlanetData(person.homeworld);

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.text}>Close</Text>
      </TouchableOpacity>
      <View style={styles.info}>
        {loading ? (
          <Text style={styles.text}>Loading planet data...</Text>
        ) : error ? (
          <Text style={styles.text}>Error: {error.message}</Text>
        ) : (
          planetData && (
            <>
              <View style={styles.title}>
                <Text style={styles.text}>
                  Information about : {person.name}
                </Text>
              </View>
              <Text style={[styles.text, {marginTop: 20}]}>
                Height: {person.height}
              </Text>
              <Text style={[styles.text, {marginTop: 20}]}>
                Mass: {person.mass}
              </Text>
              <Text style={[styles.text, {marginTop: 20}]}>
                Hair color: {person.hair_color}
              </Text>
              <Text style={[styles.text, {marginTop: 20}]}>
                Skin color: {person.skin_color}
              </Text>
              <Text style={[styles.text, {marginTop: 20}]}>
                Eye color: {person.eye_color}
              </Text>
              <Text style={[styles.text, {marginTop: 20}]}>
                Birth year: {person.birth_year}
              </Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, {marginTop: 20, maxWidth: 5, overflow: 'hidden',}]}>
                Gender: {person.gender}
              </Text>
              <Text style={[styles.text, {marginTop: 20}]}>
                Homeworld: {planetData.name}
              </Text>
            </>
          )
        )}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 30,
  },
  text: {
    fontSize: 20,
  },
  info: {
    marginTop: 20,
  },
  title: {
    alignItems: 'center',
  },
});
