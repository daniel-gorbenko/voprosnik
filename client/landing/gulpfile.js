const NODE_ENV = process.env.NODE_ENV || 'development';

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var template = require('gulp-template');
var watch = require('gulp-watch');
var config = require('./config')[NODE_ENV];

gulp.task('css', function() {
  return gulp.src(['css/bootstrap.min.css', 'css/style.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('template', function() {
  return gulp.src(['*.html'])
    .pipe(template(config))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('css/*.css', ['css']);
  gulp.watch('*.html', ['template']);
  gulp.watch('config/*.json', ['css', 'template']);
});

gulp.task('default', function () {
  if(NODE_ENV === 'development') {
    gulp.start('watch');
  }

  gulp.start('css');
  gulp.start('template');
});