const gulp = require('gulp');
const args = require("yargs").argv;
const clean = require('gulp-clean');
const rename = require('gulp-rename');

gulp.task('del', function() {
  return gulp.src('.env', 
  {
    read: false,
    allowEmpty: true,
  }
  )
    .pipe(clean());
});

gulp.task('move', function() {
  return gulp
    .src(['env/'+args.env+'.env'])
    .pipe(rename('.env'))
    .pipe(gulp.dest('./'));
});

// gulp set --env=staging
// gulp set --env=prod
gulp.task('set', gulp.series('del','move'));
