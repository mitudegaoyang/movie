import num1_16 from "./new/1-16-movie.json";
import num17_35 from "./new/17-35-movie.json";
import num36_43 from "./new/36-43-movie.json";
import num44_56 from "./new/44-56-movie.json";
import num57_69 from "./new/57-69-movie.json";
import num70_89 from "./new/70-89-movie.json";
import num90_109 from "./new/90-109-movie.json";
import num110_129 from "./new/110-129-movie.json";
import num130_149 from "./new/130-149-movie.json";
import num150_169 from "./new/150-169-movie.json";
import num170_189 from "./new/170-189-movie.json";
import num190_217 from "./new/190-217-movie.json";
import num218_242 from "./new/218-242-movie.json";
import other7k from "./other/new-7k.json";
import other6k from "./other/6k.json";
import other5k from "./other/5k.json";
import other4k from "./other/4k.json";
import other3k from "./other/3k.json";
import other2k from "./other/2k.json";
import other1k from "./other/1k.json";
// import top from "./top/1-517.json";
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
  ...other7k,
  ...other6k,
  ...other5k,
  ...other4k,
  ...other3k,
  ...other2k,
  ...other1k,
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
