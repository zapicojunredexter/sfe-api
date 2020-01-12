const arrayToObject = (array, key) => array.reduce((acc, curr) => {
  acc[curr[key]] = curr;
  return acc;
}, {});

module.exports = {
  arrayToObject,
};
