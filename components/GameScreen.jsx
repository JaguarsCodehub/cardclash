// components/GameScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import Card from './Card';

const GameScreen = ({ difficulty, storyMode }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameEnded, setGameEnded] = useState(false); // Track if the game has ended

  // Define card values based on difficulty
  const cardValues = {
    easy: ['A', 'B', 'A', 'B'],
    medium: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D'],
    hard: ['A', 'B', 'C', 'D', 'E', 'F', 'A', 'B', 'C', 'D', 'E', 'F'],
  };

  // Define timer settings based on difficulty
  const timerSettings = {
    easy: 60, // 60 seconds
    medium: 45, // 45 seconds
    hard: 30, // 30 seconds
  };

  useEffect(() => {
    // Shuffle cards based on selected difficulty
    const shuffledCards = cardValues[difficulty].sort(
      () => Math.random() - 0.5
    );
    setCards(shuffledCards);
    startTimer(); // Start the timer when the game starts
  }, [difficulty]);

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          endGame(); // End the game when time runs out
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    setTimeLeft(timerSettings[difficulty]); // Set the initial timer value

    return () => clearInterval(timer); // Clean up the timer on unmount
  };

  const endGame = () => {
    setGameEnded(true); // Set game as ended
    Alert.alert('Game Over!', `Your score: ${score}`);
  };

  const handleCardPress = (index) => {
    if (gameEnded) return; // Prevent actions if the game has ended
    if (
      flippedIndices.length < 2 &&
      !flippedIndices.includes(index) &&
      !matchedCards.includes(index)
    ) {
      setFlippedIndices((prev) => [...prev, index]);
    }
  };

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        setScore((prev) => prev + 10); // Increase score for a match
      } else {
        setScore((prev) => prev - 2); // Decrease score for a mismatch
      }
      setTimeout(() => {
        setFlippedIndices([]);
      }, 1000);
    }
  }, [flippedIndices]);

  useEffect(() => {
    if (matchedCards.length === cards.length && !gameEnded) {
      endGame(); // End the game if all cards are matched
    }
  }, [matchedCards, gameEnded]);

  return (
    <View>
      <View style={styles.container}>
        {/* Display timer */}
        {cards.map((value, index) => (
          <Card
            key={index}
            value={value}
            isFlipped={
              flippedIndices.includes(index) || matchedCards.includes(index)
            }
            onPress={() => handleCardPress(index)}
          />
        ))}
        {gameEnded && (
          <TouchableOpacity
            onPress={() => setGameEnded(false)}
            style={styles.restartButton}
          >
            <Text style={styles.restartText}>Restart Game</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.timerText}>Time Left: {timeLeft}s</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 24,
    marginBottom: 20,
    color: 'red', // Optional: Change color to indicate urgency
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  restartText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default GameScreen;
