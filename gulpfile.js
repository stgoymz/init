'use strict';

// Dependencies
const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});

// Definitions
// plugins.sass.compiler = require('sass');

// Routes
const paths = {
	dev: './dev',
	dist: './dist',
	base: './'
};

const files = {
	scss:{
		watch: paths.dev + '/scss/**/*.scss',
		src : paths.dev + '/scss/*.scss',
		dest: paths.dist + '/css'
	}
}

// Functions
const build_scss = function(done) {
	gulp.src(files.scss.src)
	.pipe($.sourcemaps.init())
	.pipe($.plumber({errorHandler: $.notify.onError("<%= error.message %>")}))
	.pipe($.sass({outputStyle: 'expanded'}))
	.pipe($.autoprefixer())
	.pipe($.sourcemaps.write())
	.pipe($.notify("Compiled: <%= file.relative %>"))
	.pipe(gulp.dest(files.scss.dest));
	done();
};

// Watch
const listening = function(done) {
	gulp.watch(files.scss.watch);
	done();
}
// Exports
exports.build_scss = build_scss;
exports.listening = listening;

// Series
const build = gulp.series(build_scss);
const work = gulp.series(build_scss, listening);

// Tasks
gulp.task('build', build);
gulp.task('work', work);
