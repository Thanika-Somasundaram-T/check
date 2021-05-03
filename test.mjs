const data =  [
    [ 'Carrot', 'Apple' ],
    [ 'Carrot', 'Guava' ],
    [ 'Guava', 'Apple' ]
];

const flatten = (data) => [].concat.apply([], data);

const unique = (array) => [...new Set(array)];

const array = flatten(data);

console.log(array);
console.log(unique(array));