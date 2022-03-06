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
import other1_40 from "./other/1-40.json";
import top from "./top/1-517.json";
// import format from "./format-movie.json";
const MOVIELIST = [
  ...num1_16,
  ...num17_35,
  ...num36_43,
  ...num44_56,
  ...num57_69,
  ...num70_89,
  ...num90_109,
  ...num110_129,
  ...num130_149,
  ...num150_169,
  ...num170_189,
  ...num190_217,
  ...num218_242,
  ...other1_40,
  ...top,
];

/**
 * 补充数据
 * **/
// format.forEach((elem: any) => {
//   if (elem.id) {
//     const movieItem = MOVIELIST.find((item: any) => {
//       return item.id === elem.id;
//     });
//     movieItem.img = elem.img;
//   }
// });
export default MOVIELIST;
