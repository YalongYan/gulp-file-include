/**
 * Created by Administrator on 2017/12/9.
 */
var gulp = require('gulp');
var fileinclude  = require('gulp-file-include'); //合并文件
var  browserSync = require('browser-sync').create(); // 
var uglify = require('gulp-uglify');  //加载js压缩

// 定义一个任务 compass
gulp.task('compass', function () {
    gulp.src(['js/*.js','!js/*.min.js'])  //获取文件，同时过滤掉.min.js文件
        .pipe(uglify())
        .pipe(gulp.dest('javascript/'));  //输出文件
});

gulp.task('fileinclude', function() {
    // 适配page中所有文件夹下的所有html，排除page下的include文件夹中html
    gulp.src(['src/html/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./src/dist'));//输出目录 由于使用的是相对路径 所以在html统计目录下新建了dist 以保持相对路径正确 
});

/*gulp.task('watch1', function () {
    gulp.watch('src/html/!**!/!*.html', ['fileinclude']); //监听html文件的变化  此任务在 fileinclude任务之后执行
});*/

gulp.task('serve',['fileinclude'],function(){
    //初始化项目跟目录为'./'（也可以使用代理proxy: "yourlocal.dev"）
    browserSync.init({
        server: './src/'  //设置根目录
    });
    //监听html文件的变化，自动重新载入
   // gulp.watch('/src/html/**/*.html').on('change', browserSync.reload);
});

gulp.task('watch', function () {
    gulp.watch('src/html/**/*.html', ['fileinclude']);  //监听之前 先做fileinclude 任务 重新解析代码   不然页面不变化
});

//默认启动的gulp任务数组['serve']   //默认任务就是直接执行gulp 然后执行的命令
gulp.task('default', ['serve','watch']);