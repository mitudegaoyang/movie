import newData from "../data/source/all-new.json";
import otherData from "../data/source/all-other.json";
import topData from "../data/source/all-top.json";
const MOVIELIST: any = [];
const top = Math.ceil(topData.length / 400);
for (let i = 0; i < top; i++) {
  MOVIELIST.push(`top/${i + 1}`);
}
const other = Math.ceil(otherData.length / 400);
for (let i = 0; i < other; i++) {
  MOVIELIST.push(`other/${i + 1}`);
}
const news = Math.ceil(newData.length / 400);
for (let i = 0; i < news; i++) {
  MOVIELIST.push(`new/${i + 1}`);
}
MOVIELIST.reverse();
export default MOVIELIST;

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
