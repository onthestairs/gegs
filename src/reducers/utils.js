export const currentCrosswordState = ({crosswords: {currentCrosswordId, crosswords}}) => {
  // console.log(crosswords, currentCrosswordId);
  return crosswords[currentCrosswordId];
}
