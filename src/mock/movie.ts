import num1_16 from "./1-16-movie.json";
import num17_35 from "./17-35-movie.json";
import num36_43 from "./36-43-movie.json";
import num44_56 from "./44-56-movie.json";
import num57_59 from "./57-59-movie.json";
import num130_149 from "./130-149-movie.json";
import num150_154 from "./150-154-movie.json";
import num170_189 from "./170-189-movie.json";
import num190_217 from "./190-217-movie.json";
import num218_242 from "./218-242-movie.json";
import format from "./format-movie.json";
const MOVIELIST = num1_16
  .concat(num17_35)
  .concat(num36_43)
  .concat(num44_56)
  .concat(num57_59)
  .concat(num130_149)
  .concat(num150_154)
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
