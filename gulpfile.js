const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const webp = require('gulp-webp');


function compilecss() {
  return src('src/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(prefix('last 10 versions'))
    .pipe(concat('style.min.css'))
    .pipe(dest('./dist/css'))
}

function jsmin() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'src/js/*.js'
  ])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest('./dist/js/'))
}

function webpimg() {
  return src('src/images/*.{jpg, png}')
    .pipe(webp())
    .pipe(dest('./dist/images'))
}

function watchTasks() {
  watch('src/scss/**/*.scss', compilecss);
  watch('src/js/**/*.js', jsmin);
  watch('src/images/*.{jpg, png}', webpimg);
}

exports.default = series(
  compilecss,
  jsmin,
  webpimg,
  watchTasks
);