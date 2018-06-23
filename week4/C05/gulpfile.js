const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('es6', () => gulp.src('src/js/main.js')
  .pipe(babel({
    presets: ['es2015'],
  }))
  .pipe(gulp.dest('build/js')));

gulp.task('st3', () => gulp.src('src/js/asyncStuff.js')
  .pipe(babel({
    presets: ['stage-3'],
  }))
  .pipe(gulp.dest('build/js')));

gulp.task('default', ['es6', 'st3'], () => {
  gulp.watch('src/js/asyncStuff.js', ['st3']);
  gulp.watch('src/js/main.js', ['es6']);
});
