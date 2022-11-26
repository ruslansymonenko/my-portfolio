const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function compilecss() {
  return src('src/scss/style.scss')
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

function watchTasks() {
  watch('src/scss/**/*.scss', compilecss);
  watch('src/js/**/*.js', jsmin);
  watch('src/images/*.{jpg, png}', imagemin);
}

exports.default = series(
  compilecss,
  jsmin,
  watchTasks
);