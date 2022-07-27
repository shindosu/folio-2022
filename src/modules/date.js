Date.prototype.monthYear = function () {
  return `${this.toLocaleString('default', { month: 'long' })} ${this.getFullYear()}`;
};
