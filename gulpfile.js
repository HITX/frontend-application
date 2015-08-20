'use strict'

var gulp = require('gulp')
var browserify = require('browserify');
var reactify = require('reactify');
var envify = require('envify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var less = require('gulp-less');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');

var isProd = process.env.NODE_ENV === 'production';

console.log('Is Production:');
console.log(isProd ? 'True' : 'False');

var paths = {
  app: {
    entry: './app/main.jsx',
    css: './assets/css/*.less',
    js: './app/**/*.jsx'
  },
  server: {
    entry: './server/main.js',
    js: './server/*.js'
  },
  apilib: {
    entry: './assets/js/apilib/main.js',
    js: './assets/js/apilib/*.js'
  }
};

var app_builder = function builder() {
  return browserify({
    entries: paths.app.entry,
    extensions: ['.jsx']
  })
    .transform(reactify)
    .transform(envify)
    .bundle()
    .pipe(source('main.jsx'))
    .pipe(rename('bundle.js'));
};

var apilib_builder = function apilib_builder() {
  return browserify({
    entries: paths.apilib.entry,
  })
    .bundle()
    .pipe(source('main.js'))
    .pipe(rename('apilib.js'));
};

gulp.task('build-app', function() {
  return app_builder()
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('build-apilib', function() {
  return apilib_builder()
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('less', function() {
  return gulp.src('./assets/css/styles.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('build', ['build-app', 'build-apilib', 'less']);

function watch() {

  process.stdout.write("Watching...\n");

  nodemon({
    // script: 'server.js',
    script: paths.server.entry,
    stdout: false,
    ext: 'js less html'
  });

  gulp.watch(paths.app.js, ['build-app']);
  gulp.watch(paths.app.css, ['less']);
  gulp.watch(paths.apilib.js, ['build-apilib']);
  gulp.watch(paths.server.js);
}

gulp.task('default', ['build']);

gulp.task('watch', ['build'], function() {
  isProd ? gutil.noop() : watch();
});
