import num1_16 from "./1-16-movie.json";
import num17_35 from "./17-35-movie.json";
import num36_43 from "./36-43-movie.json";
import num44_56 from "./44-56-movie.json";
import num57_69 from "./57-69-movie.json";
import num70_89 from "./70-89-movie.json";
import num90_109 from "./90-109-movie.json";
import num110_129 from "./110-129-movie.json";
import num130_149 from "./130-149-movie.json";
import num150_169 from "./150-169-movie.json";
import num170_189 from "./170-189-movie.json";
import num190_217 from "./190-217-movie.json";
import num218_242 from "./218-242-movie.json";
import format from "./format-movie.json";
const MOVIELIST = num1_16
  .concat(num17_35)
  .concat(num36_43)
  .concat(num44_56)
  .concat(num57_69)
  .concat(num70_89)
  .concat(num90_109)
  .concat(num110_129)
  .concat(num130_149)
  .concat(num150_169)
  .concat(num170_189)
  .concat(num190_217)
  .concat(num218_242);

format.forEach((elem: any) => {
  if (elem.id) {
    const movieItem = MOVIELIST.find((item: any) => {
      return item.id === elem.id;
    });
    movieItem.img = elem.img;
  }
});
export default MOVIELIST;
