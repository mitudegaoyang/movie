import newData from "../data/source/new-info.json";
import otherData from "../data/source/other-info.json";
import topData from "../data/source/top-info.json";
const MOVIELIST: any = [];
const top = topData.fileLength;
for (let i = 0; i < top; i++) {
  MOVIELIST.push(`top/${i + 1}`);
}
const other = otherData.fileLength;
for (let i = 0; i < other; i++) {
  MOVIELIST.push(`other/${i + 1}`);
}
const news = newData.fileLength;
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
