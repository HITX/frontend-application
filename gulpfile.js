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

var paths = {
  app: './app/main.jsx',
  js: [
    './server.js',
    './app/**/*.jsx'
  ],
  css: ['assets/css/*.less']
};

var builder = function builder() {
  return browserify({
    // entries: './app/main.jsx',
    entries: paths.app,
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

function watch() {

  process.stdout.write("Watching...\n");

  nodemon({
    script: 'server.js',
    stdout: false,
    ext: 'js less html'
  });

  gulp.watch(paths.js, ['build']);
  gulp.watch(paths.css, ['less']);
}

// gulp.task('watch', ['build'], function() {
//   isProd ? gutil.noop() : process.stdout.write('Will watch here\n');
  //   gulp.watch(paths.app, ['build']),
  //   gulp.watch(paths.js, ['build']),
  //   gulp.watch(paths.css, ['less'])
  // );
// });

gulp.task('default', ['build'], function() {
  isProd ? gutil.noop() : watch();
});
