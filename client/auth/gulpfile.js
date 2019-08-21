const NODE_ENV = process.env.NODE_ENV || 'development';

var gulp = require('gulp');
var concat = require('gulp-concat');
var template = require('gulp-template');
var watch = require('gulp-watch');
var config = require('./config')[NODE_ENV];

gulp.task('template', function() {
  return gulp.src(['*.html'])
    .pipe(template(config))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('*.html', ['template']);
  gulp.watch('config/*.json', ['template']);
});

gulp.task('default', function () {
  if(NODE_ENV === 'development') {
    gulp.start('watch');
  }

  gulp.start('template');
});