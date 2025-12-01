const LETTERPOOL = new Map([
  ['A', 9],
  ['B', 2],
  ['C', 2],
  ['D', 4],
  ['E', 12],
  ['F', 2],
  ['G', 3],
  ['H', 2],
  ['I', 9],
  ['J', 1],
  ['K', 1],
  ['L', 4],
  ['M', 2],
  ['N', 6],
  ['O', 8],
  ['P', 2],
  ['Q', 1],
  ['R', 6],
  ['S', 4],
  ['T', 6],
  ['U', 4],
  ['V', 2],
  ['W', 2],
  ['X', 1],
  ['Y', 2],
  ['Z', 1],
]);
const SCORECHART = new Map([
  ['A', 1], ['E', 1], ['I', 1], ['O', 1], ['U', 1],
  ['L', 1], ['N', 1], ['R', 1], ['S', 1], ['T', 1],
  ['D', 2], ['G', 2],
  ['B', 3], ['C', 3], ['M', 3], ['P', 3],
  ['F', 4], ['H', 4], ['V', 4], ['W', 4], ['Y', 4],
  ['K', 5],
  ['J', 8], ['X', 8],
  ['Q', 10], ['Z', 10],
]);
export const drawLetters = () => {
  const drawHands = [];
  const bag = getBagOfLetters();
  const NUM_TILES_ALLOWED_IN_HAND = 10;
  while (drawHands.length < NUM_TILES_ALLOWED_IN_HAND) {
    const indexToRemove = Math.floor(Math.random() * bag.length);
    const letter = bag[indexToRemove];

    drawHands.push(letter);
    bag.splice(indexToRemove, 1);
  }
  return drawHands;

};

const getBagOfLetters = () => {
  const bag = [];
  for (const [letter, count] of LETTERPOOL) {
    for (let i = 0; i < count; i++) {
      bag.push(letter);
    }
  }
  return bag;

};

export const usesAvailableLetters = (input, lettersInHand) => {

  const copiedletters = [...lettersInHand];
  for(let char of input.toUpperCase()){
    if (!copiedletters.includes(char)){
      return false;

    } else {
      const index = copiedletters.indexOf(char);
      copiedletters.splice(index, 1);
    }
  }
  return true;
};

export const scoreWord = (word) => {
  let totalScore = 0;

  for (const char of word.toUpperCase()) {
    totalScore += SCORECHART.get(char);
  }

  if (word.length >= 7 && word.length <= 10) {
    const BONUS_POINTS_FOR_LENGTH = 8;
    totalScore += BONUS_POINTS_FOR_LENGTH;
  }
  return totalScore;

};

const breakTie = (currentWinner, challenger) => {
  if (challenger.length === 10 && currentWinner.length !== 10) {
    return challenger;
  }

  if (
    currentWinner.length !== 10 &&
    challenger.length < currentWinner.length
  ) {
    return challenger;
  }

  return currentWinner;
};



export const highestScoreFrom = (words) => {
  let highestScore = 0;
  let highestScoringWords = [];

  for (const word of words) {
    const score = scoreWord(word);

    if (score > highestScore) {
      highestScore = score;
      highestScoringWords = [word];
    } else if (score === highestScore) {
      highestScoringWords.push(word);
    }
  }

  let winningWord = highestScoringWords[0];

  for (const word of highestScoringWords) {
    winningWord = breakTie(winningWord, word);
  }

  return { word: winningWord, score: highestScore };
};