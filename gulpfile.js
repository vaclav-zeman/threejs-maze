const gulp = require("gulp");
const babel = require('gulp-babel');

gulp.task('babel', () => {
	return gulp.src('src/renderer.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('watch', () => {
	gulp.watch('src/*.js', ['babel']);
});

gulp.task('default', ['watch', 'babel']);
