export const pairs = xs => {
  let pairs = [];
  xs.forEach((x1, i) => {
    xs.forEach((x2, j) => {
      if (i !== j) {
        pairs.push([x1, x2]);
      }
    });
  });
  return pairs;
};

export const nonZeroSplits = xs => {
  let xsSplits = [];
  for (let i = 1; i < xs.length; i++) {
    const start = xs.slice(0, i);
    const end = xs.slice(i);
    xsSplits.push([start, end]);
  }
  return xsSplits;
};

export const addMissing = (xs, ys, predicate) => {
  return ys.map(y => {
    const filteredXs = xs.filter(x => {
      return predicate(x, y);
    });
    if (filteredXs.length > 0) {
      return filteredXs[0];
    } else {
      return {
        ...y,
        type: "missing"
      };
    }
  });
};

export const stripAnswer = answer => {
  return answer.replace(/( |-)/g, "");
};
