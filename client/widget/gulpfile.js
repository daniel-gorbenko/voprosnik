var uglify = require('gulp-uglify');
var pump = require('pump');

const NODE_ENV = process.env.NODE_ENV || 'development';

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var template = require('gulp-template');
var watch = require('gulp-watch');
var sequence = require('run-sequence');
var config = require('./config')[NODE_ENV];

gulp.task('css', function() {
  return gulp.src(['css/style.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('full-css', function () {
  sequence('css', ['template']);
});

gulp.task('compress', function (cb) {
  pump([
      gulp.src('app/*.js'),
      uglify(),
      gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('template', function() {
  return gulp.src(['dist/style.css'])
    .pipe(template(config))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('css/*.css', ['full-css']);
  gulp.watch('app/*.js', ['compress']);
  gulp.watch('config/*.json', ['full-css', 'compress']);
});

gulp.task('default', function () {
  if(NODE_ENV === 'development') {
    gulp.start('watch');
  }

  gulp.start('full-css');
  gulp.start('compress');
});