let a = require("./218-242-url-.json");
let b = require("./218-242-movie.json");

let arr = a.filter((elem) => {
  return b.every((item) => elem.id !== item.id)
});

console.log(JSON.stringify(arr))
console.log(arr.length)

