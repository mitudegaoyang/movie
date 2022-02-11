import num1_35 from "./1-35-movie-20220207.json";
import num190_199 from "./190-199-movie-20220211.json";
import num200_217 from "./200-217-movie-20220210.json";
import num218_242 from "./218-242-movie-20220211.json";
import format from "./format-movie.json";
const MOVIELIST = num1_35
  .concat(num190_199)
  .concat(num200_217)
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
