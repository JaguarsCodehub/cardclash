// components/Card.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const Card = ({ value, isFlipped, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View
        style={[
          styles.cardContent,
          isFlipped ? styles.flipped : styles.unflipped,
        ]}
      >
        <Text style={styles.cardText}>{isFlipped ? value : '?'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 120,
    margin: 10,
    backgroundColor: '#40534C',
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#40534C',
  },
  flipped: {
    backgroundColor: '#40534C',
  },
  unflipped: {
    backgroundColor: '#D6BD98',
  },
  cardText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Card;
