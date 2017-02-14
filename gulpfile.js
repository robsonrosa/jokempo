// from gulp/recipes
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/mocha-test-runner-with-gulp.md

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('default', function () {
  gulp.watch(['src/**', 'test/**'], ['mocha']);
});

gulp.task('mocha', function () {
  return gulp.src(['src/core/**/*.js', 'test/**/bot.spec.js'], { read: false })
    .pipe(mocha())
    .on('error', gutil.log);
});
