'use strict';

const _ = require('lodash');

var data = []; // store tweets

function add(name, content) {
  var id = data.length;
  data.push({ name: name, content: content, id: id });
}

function list() {
  return _.cloneDeep(data); // makes identical array that is not the orig arr
}

function find(properties) {
  return _.cloneDeep(_.filter(data, properties));
}
// properties is a callback function

module.exports = { add: add, list: list, find: find };

const randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getFakeName = function() {
  const fakeFirsts = ['Nimit', 'David', 'Shanna', 'Emily', 'Scott', 'Karen', 'Ben', 'Dan', 'Ashi', 'Kate', 'Omri', 'Gabriel', 'Joe', 'Geoff'];
  const fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + ' ' + randArrayEl(fakeLasts);
};

const getFakeTweet = function() {
  const awesomeAdj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing', 'impressive'];
  return 'Fullstack Academy is ' + randArrayEl(awesomeAdj) + '! The instructors are just so ' + randArrayEl(awesomeAdj) + '. #fullstacklove #codedreams';
};

for (let i = 0; i < 10; i++) {
  add( getFakeName(), getFakeTweet() );
}
add('claire', 'test tweet');
add('claire', 'test tweet two');
