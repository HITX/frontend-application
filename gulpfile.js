'use strict'

var gulp = require('gulp')
var browserify = require('browserify');
var reactify = require('reactify');
var envify = require('envify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var less = require('gulp-less');

var builder = function builder() {
  return browserify({
    entries: './app/main.jsx',
    extensions: ['.jsx']
  })
    .transform(reactify)
    .transform(envify)
    .bundle()
    .pipe(source('main.jsx'))
    .pipe(rename('bundle.js'));
};

gulp.task('build-js', function() {
  return builder()
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('less', function() {
  return gulp.src('./assets/css/styles.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('build', ['build-js', 'less']);
// gulp.task('build', ['build-js']);

// gulp.task('watch', ['build', 'run-server', 'less'], function() {
//   gulp.watch(paths.app, ['build']);
//   gulp.watch(paths.js, ['build']);
//   gulp.watch(paths.css, ['less']);
// });

// gulp.task('default', ['watch']);
gulp.task('default', ['build']);
