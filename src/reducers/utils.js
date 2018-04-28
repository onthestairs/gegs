export const currentCrosswordState = ({
  crosswords: { currentCrosswordId, crosswords }
}) => {
  return crosswords[currentCrosswordId];
};
