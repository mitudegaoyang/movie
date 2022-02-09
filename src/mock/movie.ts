import top800 from "./20220207-movie.json";
import num200208 from "./20220209-200-208-movie.json";
import format from "./format-movie.json";
const MOVIELIST = top800.concat(num200208);

format.forEach((elem: any) => {
  if (elem.id) {
    const movieItem = MOVIELIST.find((item: any) => {
      return item.id === elem.id;
    });
    movieItem.img = elem.img;
  }
});
export default MOVIELIST;
