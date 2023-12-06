import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalItems,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };
  const startItem = (currentPage - 1) * 10 + 1;
  const endItem =
    currentPage * 10 <= totalItems ? currentPage * 10 : totalItems;

  return (
    <View style={styles.container}>
      <Text>
        {startItem}-{endItem} of {totalItems}
      </Text>
      {currentPage === 1 ? (
        <Text style={styles.buttonDontActive}>{'<'}</Text>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePageChange(currentPage - 1)}>
          <Text>{'<'}</Text>
        </TouchableOpacity>
      )}
      {endItem===totalItems ? <Text style={styles.buttonDontActive}>{'>'}</Text> :<TouchableOpacity
        onPress={() => handlePageChange(currentPage + 1)}
        style={styles.button}>
        <Text>{'>'}</Text>
      </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginLeft: 20,
    width: 20,
  },
  buttonDontActive: {marginLeft: 20, opacity: 0.5}
});
