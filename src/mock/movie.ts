const MOVIELIST: any = [];
const other = 15;
for (let i = 0; i < other; i++) {
  MOVIELIST.push(`other/${i + 1}`);
}
const news = 14;
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
