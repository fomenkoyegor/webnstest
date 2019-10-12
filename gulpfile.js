const { src, dest, task, parallel, watch, series } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require("gulp-babel");
const del = require("del");
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');
var compiler = require('webpack');
const dir = { src: "./client/", dest: "./public/" };
const isDev = true;
const isProd = !isDev;
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const path = require('path');


const webpackConfig = {
    output: {
        filename: "index.js"
    },
    mode: isDev ? 'development' : 'production'
};


const htmlSrc = `${dir.src}*.html`;
const htmlDest = dir.dest;
const copyHtml = () => src(htmlSrc).pipe(dest(htmlDest));
task("copyHtml", copyHtml);

const scriptSrc = path.join(__dirname, './client/index.js');
const scriptDest = `${dir.dest}`;
const scriptName = "index.js";
const scripts = () => src(scriptSrc)
    .pipe(webpack(webpackConfig))
    .pipe(dest(scriptDest))
    .pipe(browserSync.stream());
task("scripts", scripts);


const styleSrc = `${dir.src}index.scss`;
const styleDest = `${dir.dest}`;
const styleName = "index.css";
const style = () => src(styleSrc)
    .pipe(sass().on("error", sass.logError))
    .pipe(concat(styleName))
    .pipe(autoprefixer({
        
    }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(dest(styleDest))
    .pipe(browserSync.stream());
task("style", style);

const watchFiles = () => {
    browserSync.init({
        // server: {
        //     baseDir: dir.dest
        // },
        proxy:"http://webnstest.test",
        open: false,

    });
    watch(scriptSrc, scripts);
    watch('./client/**/*.scss', style);
    watch(htmlSrc, copyHtml).on('change', browserSync.reload);
};

const clean = () => del([`${dir.dest}*`]);
task("clean", clean);


task('default', parallel(
    [
        'copyHtml',
        'style',
        'scripts'
    ]
));

task("watch", watchFiles);

task("build", series("clean", "default"));

task("dev", series("build", "watch"));

