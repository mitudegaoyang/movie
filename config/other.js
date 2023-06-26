const fs = require("fs");
//系统路径模块
let path = require("path");
let formatList = require("../src/data/source/all-other.json");
// 单个文件条目数
let fileLength = 400;
// 按文件条目拆分循环次数
let num = Math.ceil(formatList.length / fileLength);
console.log(`共${num}个其他类电影文件`);
for (i = 0; i < num; i++) {
  // 格式化json
  let text = JSON.stringify(formatList.splice(-fileLength));

  // 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
  let rootPath = path.resolve(__dirname, "..");
  let file = path.join(rootPath + "/public/data/other", `${i + 1}.json`);

  //写入文件
  fs.writeFile(file, text, function (err) {
    if (err) {
      console.log(err);
    } else {
      if (i === num - 1) {
        console.log("文件创建成功~");
      }
    }
  });
}
