export const createSortedKeywordsObj = (cards) => {
  const keywordsObj = {};

  cards.forEach((card) => {
    if (card.keyword in keywordsObj) {
    keywordsObj[card.keyword] += 1;
    } else {
    keywordsObj[card.keyword] = 1;
   }
  });
  
  const entries = Object.entries(keywordsObj);
  
  entries.sort((arr1, arr2) => {
    return arr2[1] - arr1[1];
  });

  return entries.map((entry) => entry[0]);
}