const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const minify = require('gulp-babel-minify');

gulp.task('sass', () => {
    return gulp.src('static_src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/static/css'))
});

gulp.task('sass-minify', () => {
    return gulp.src('static_src/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('public/static/css'))
});

gulp.task('js', () =>
    gulp.src('static_src/js/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('public/static/js'))
);

gulp.task('js-minify', () =>
  gulp.src('static_src/js/*.js')
    .pipe(minify({
        mangle: {
            keepClassName: true
        }
    }))
    .pipe(gulp.dest('public/static/js'))
);

gulp.task('move-assets', () => {
    return gulp.src('static_src/assets/**/*')
        .pipe(gulp.dest('public/static/assets'));
});

gulp.task('watch', () => {
    gulp.watch('static_src/js/*.js', ['js']);
    gulp.watch('static_src/scss/**/*.scss', ['sass']);
    gulp.watch('static_src/assets/**/*', ['move-assets']);
});

gulp.task('deploy', ['sass-minify', 'js-minify', 'move-assets']);
