let gulp = require("gulp");
let ts = require("gulp-typescript");
let tsp = ts.createProject("tsconfig.json"); //使用tsconfig.json文件配置tsc
let exec = require("child_process").exec;

let child;
//目录常量
const PATHS = {
  scripts: ["./src/**/*.ts"],
  output: "./build",
};
// //编译ts文件
gulp.task("build-ts", function (cb) {
  gulp.src(PATHS.scripts).pipe(tsp()).pipe(gulp.dest(PATHS.output));
  cb();
});
//自动重启服务器
gulp.task("restart", function (cb) {
  child = exec(
    "supervisor -w build ./build/index.js", // -w  When a change to a js file occurs, reload the program
    (error, stdout, stderr) => {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    }
  );
  cb();
});
// //监视ts文件变化
// gulp.watch(PATHS.scripts, gulp.series("build-ts", "restart"));
gulp.watch(PATHS.scripts, gulp.series("build-ts"));
// // //开发任务
gulp.task("dev", gulp.series("build-ts", "restart"));
