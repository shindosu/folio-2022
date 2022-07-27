const monthYear = timestamp => {
  const date = new Date(timestamp);

  return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
};

export default monthYear;
