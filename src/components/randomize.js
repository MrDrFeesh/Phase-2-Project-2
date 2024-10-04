// src/randomize.js

export function getRandomItem(array) {
    if (!array || array.length === 0) {
      throw new Error('Array is empty or undefined');
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  
  export function getRandomPerks(perks, count) {
    if (!perks || perks.length === 0) {
      throw new Error('Perks array is empty or undefined');
    }
    const shuffled = perks.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }