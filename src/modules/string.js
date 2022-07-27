String.prototype.upCase = function () {
  return this[0].toUpperCase() + this.slice(1).toLowerCase();
};
