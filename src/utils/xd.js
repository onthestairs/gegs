const { populateClues } = require("../selectors");

const makeLengthString = (answer) => {
  const words = answer.split(" ");
  const wordStrings = words.map((word) => {
    const bits = word.split("-");
    return bits.map((bit) => bit.length).join("-");
  });
  return "(" + wordStrings.join(",") + ")";
};

const makeClueBody = (clue) => {
  let clueText = "";
  let lengthString = "";
  switch (clue.type) {
    // this is a clue where we actually want to show the surface
    case "single":
    case "start":
      clueText = clue.clue;
      lengthString = makeLengthString(clue.answer);
      break;
    // a spillover clue so reference the original
    case "spillover":
      clueText = `See ${clue.startN} ${clue.startDirection}`;
      break;
    case "missing":
      lengthString = makeLengthString(clue.gridAnswer.replace(/( |-)/g, "a"));
      break;
    default:
  }
  return `${clueText} ${lengthString}`;
};

const makeXDString = (crossword) => {
  const grid = crossword.grid;
  const clues = populateClues(crossword.clues, crossword.clueBank);
  let s = `Name: ${crossword.name}\n\n`;
  grid.forEach((row) => {
    row.forEach((cell) => {
      if (cell === ".") {
        s += "#";
      } else if (cell === " ") {
        s += ".";
      } else {
        s += cell.toUpperCase();
      }
    });
    s += "\n";
  });
  s += "\n\n";

  // now do the clues
  const acrossClues = clues.filter((clue) => clue.direction === "across");
  const downClues = clues.filter((clue) => clue.direction === "down");
  acrossClues.forEach((clue) => {
    const clueBody = makeClueBody(clue);
    const clueStr = `A${clue.n}. ${clueBody} ~ ${clue.answer}`;
    s += clueStr;
    s += "\n";
  });
  s += "\n";
  downClues.forEach((clue) => {
    const clueBody = makeClueBody(clue);
    const clueStr = `D${clue.n}. ${clueBody} ~ ${clue.answer}`;
    s += clueStr;
    s += "\n";
  });

  // finished
  return s;
};

export const downloadXDString = (crossword) => {
  const xdString = makeXDString(crossword);
  download("crossword.xd", xdString);
};

const download = (filename, text) => {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
