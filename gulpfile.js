"use strict";

const gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	eslint = require('gulp-eslint')
;

gulp.task('lint', function () {
    return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
