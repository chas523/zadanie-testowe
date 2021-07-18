'use strict'; 

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const gcmq = require('gulp-group-css-media-queries');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const webpcss = require("gulp-webpcss");
const htmlmin = require('gulp-htmlmin');
const babel  = require('gulp-babel'); 


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
});



//only gulp
// you need  npm install --save-dev gulp-babel @babel/core @babel/preset-env  
gulp.task("js-gulp", function() { 
    gulp.src('./src/js/script.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest("./dist/js"))
        .pipe(rename("script.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
        .pipe(gulp.dest("./src/js"))
        .pipe(browserSync.stream());
}); 

gulp.task('sass', function() {
    return gulp.src("src/scss/style.sass")
        .pipe(sass({outputStyle: "expanded"}).on('error', sass.logError))
        .pipe(webpcss({}))
        .pipe(gcmq())
        .pipe(autoprefixer('last 5 versions'))
        .pipe(gulp.dest("./src/css"))
        .pipe(gulp.dest("./dist/css"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gulp.dest("./dist/css"))
        .pipe(gulp.dest("./src/css"))
        .pipe(browserSync.stream());
});
gulp.task('html', function() {
    return  gulp.src("src/index.html")
        .pipe(webpHTML())
        // .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./dist/"))
        .pipe(browserSync.stream()); 
}); 
gulp.task('image', function() {
    gulp.src('src/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 // 0 to 7
        }))
        .pipe(gulp.dest('./dist/images'))
        .pipe (webp({
            quality: 75
        }))
        .pipe(gulp.dest('./src/images'))
        .pipe(gulp.dest('./dist/images'))
        .pipe(browserSync.stream()); 
}); 

gulp.task('watch', function() {
    gulp.watch('./src/js/**/*.js', gulp.series('js-gulp')); 
    gulp.watch('./src/scss/**/*.+(scss|sass)', gulp.series('sass')); 
    gulp.watch('./src/**/*.html', gulp.series('html')); 
    gulp.watch('./src/images/**/*', gulp.series('image'));
});


gulp.task('default', gulp.parallel('browser-sync', 'html', 'sass', 'js-gulp', 'image',  'watch'));
