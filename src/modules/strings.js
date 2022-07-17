const oneWord = text => text.indexOf(' ') === -1;

const splitText = text => {
  if (oneWord(text)) return;

  text.split(' ');
};

export { oneWord, splitText };
