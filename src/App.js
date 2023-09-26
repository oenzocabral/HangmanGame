import React, { useState, useEffect } from 'react';
import './App.css';

const words = ['hangman', 'javascript', 'react', 'developer', 'programming'];

function App() {
  const [word, setWord] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [chances, setChances] = useState(6);

  useEffect(() => {
    selectRandomWord();
  }, []);

  useEffect(() => {
    if (word === '') return;

    let newDisplayWord = '';
    for (const char of word) {
      if (guessedLetters.includes(char)) {
        newDisplayWord += char;
      } else {
        newDisplayWord += '_';
      }
    }
    setDisplayWord(newDisplayWord);

    if (!newDisplayWord.includes('_')) {
      alert('Congratulations! You won!');
      selectRandomWord();
      setGuessedLetters([]);
      setChances(6);
    }
  }, [word, guessedLetters]);

  const selectRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setWord(words[randomIndex].toLowerCase());
  };

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!word.includes(letter)) {
        setChances(chances - 1);
      }
    }
  };

  const restartGame = () => {
    selectRandomWord();
    setGuessedLetters([]);
    setChances(6);
  };

  const hangmanImages = [
    'images/hangman0.png',
    'images/hangman1.png',
    'images/hangman2.png',
    'images/hangman3.png',
    'images/hangman4.png',
    'images/hangman5.png',
    'images/hangman6.png',
  ];

  return (
    <div className="App">
      <h1>Hangman Game</h1>
      <img src={hangmanImages[6 - chances]} alt={`Hangman ${6 - chances}`} />
      <p>Chances Left: {chances}</p>
      <p>Word: {displayWord}</p>
      <p>Guessed Letters: {guessedLetters.join(', ')}</p>
      {chances > 0 && displayWord.includes('_') ? (
        <div>
          <p>Guess a letter:</p>
          <div>
            {Array.from('abcdefghijklmnopqrstuvwxyz').map((letter) => (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.includes(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p>You lose! The word was: {word}</p>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
}

export default App;
