const flatten = (data) => [].concat.apply([], data);

const unique = (array) => [...new Set(array)];

export {flatten, unique};