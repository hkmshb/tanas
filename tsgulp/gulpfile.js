var gulp = require('gulp');
var gulpTS = require('gulp-typescript');
var proj = gulpTS.createProject('tsconfig.json');

gulp.task('default', function() {
  return proj.src()
             .pipe(proj())
             .js.pipe(gulp.dest('dist'));
});