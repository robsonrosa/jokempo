var gulp = require('gulp');

// build into ./build
var dest = './build';
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var sequence = require('gulp-sequence');

gulp.task('clean', () => gulp.src(dest, { read: false, force: true }).pipe(clean()));
gulp.task('build-css', () => gulp.src('src/app/style.css').pipe(gulp.dest(dest)));
gulp.task('build-img', () => gulp.src('src/app/img/**/*.png').pipe(gulp.dest(dest + '/img')));
gulp.task('build-html', () => gulp.src('src/app/index.html').pipe(gulp.dest(dest)));
gulp.task('build-js', () => {
  gulp.src('src/app/app.js')
    .pipe(browserify({ insertGlobals: true }))
    .pipe(gulp.dest(dest));
});

gulp.task('build', ['build-js', 'build-img', 'build-css', 'build-html']);
gulp.task('main', function(callback) {
  sequence('clean', 'build')(callback);
});

gulp.task("app", function() {
    gulp.watch("src/app/**/*", ["main"]);
});


// from gulp/recipes
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/mocha-test-runner-with-gulp.md
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('default', function () {
  gulp.watch(['src/**', 'test/**'], ['mocha']);
});

gulp.task('mocha', function () {
  return gulp.src(['src/core/**/*.js', 'test/**/*.js'], { read: false })
    .pipe(mocha())
    .on('error', gutil.log);
});
