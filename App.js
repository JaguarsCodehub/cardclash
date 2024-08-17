// App.js
import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import GameScreen from './components/GameScreen';

export default function App() {
  const [difficulty, setDifficulty] = useState(null); // Track selected difficulty

  const startGame = (level) => {
    setDifficulty(level); // Set the selected difficulty
  };

  return (
    <View style={styles.container}>
      {difficulty ? (
        <GameScreen difficulty={difficulty} /> // Pass difficulty to GameScreen
      ) : (
        <View style={styles.difficultySelector}>
          <Text style={styles.title}>Select Difficulty</Text>
          <Button title='Easy' onPress={() => startGame('easy')} />
          <Button title='Medium' onPress={() => startGame('medium')} />
          <Button title='Hard' onPress={() => startGame('hard')} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  difficultySelector: {
    marginTop: 10,
    gap: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
