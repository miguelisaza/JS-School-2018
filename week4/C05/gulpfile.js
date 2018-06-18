const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('es6', () => {
    return gulp.src('src/js/asyncStuff.js')
        .pipe(babel({
            presets: ['stage-3']
        }))
        .pipe(gulp.dest('build/js'));
});

gulp.task('default', ['es6'], () => {
    gulp.watch('src/js/asyncStuff.js', ['es6'])
});