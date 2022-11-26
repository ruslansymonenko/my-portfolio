const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const webp = require('gulp-webp');


function compilecss() {
  return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(dest('./dist/css'))
}

function jsmin() {
  return src('src/js/*.js')
    .pipe(terser())
    .pipe(dest('./dist/js'))
}

function webpimg() {
  return src('src/images/*.{jpg, png}')
    .pipe(webp())
    .pipe(dest('./dist/images'))
}

function watchTasks() {
  watch('src/scss/*.scss', compilecss);
  watch('src/js/*.js', jsmin);
  watch('src/images/*.{jpg, png}', webpimg);
}

exports.default = series(
  compilecss,
  jsmin,
  webpimg,
  watchTasks
);