"use strict"
import gulp from 'gulp'
import webserver from 'gulp-webserver'
import concat from 'gulp-concat'
import browserify from 'browserify'
import reactify from 'reactify'
import babelify from 'babelify'
import watchify from 'watchify'
import source from 'vinyl-source-stream'
import livereload from 'gulp-livereload'

const DEST = "build"

const src = {
  webpages: "app/*.html",
  css: "./app/css/*.scss",
  images: "app/images/*.*"
}

gulp.task('build-app', ['webpages', 'images', 'css', 'fonts', 'fonts-awesome', 'vendor-css', 'vendor-js', 'transform'])

gulp.task('watch', ['build-app', 'webserver'], () => {
  gulp.watch(src.webpages, ["webpages"])
  gulp.watch(src.css, ["css"])
  gulp.watch(src.images, ["images"])
})

gulp.task('webpages', () => {
	return gulp.src(src.webpages)
	.pipe(gulp.dest(DEST))
})

gulp.task('images', () => {
	return gulp.src(src.images)
	.pipe(gulp.dest(DEST))
})

gulp.task('css', () => {
	return gulp.src(src.css)
	.pipe(concat("main.css"))
	.pipe(gulp.dest(DEST))
})

gulp.task("fonts", function() {
  return gulp.src([
    "app/vendor/materialize/font/**/*"
  ])
  .pipe(gulp.dest(DEST + "/font"))
})

gulp.task("fonts-awesome", function() {
  return gulp.src([
    "./app/vendor/font-awesome/fonts/**.*"
  ])
  .pipe(gulp.dest(DEST + "/fonts"))
})

gulp.task('vendor-css', () => {
	return gulp.src([
		"app/vendor/Materialize/dist/css/materialize.css",
		"app/vendor/font-awesome/css/font-awesome.css"
	])
	.pipe(concat("vendor.css"))
	.pipe(gulp.dest(DEST + "/css"))
})

gulp.task("vendor-js", () => {
  return gulp.src([
    'app/vendor/jquery/dist/jquery.js',
    'app/vendor/materialize/dist/js/materialize.js'])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(DEST + "/js"))
})

gulp.task("transform", () => {
	var bundler;

	var bundle = () => {
		return bundler.bundle()
			.on('error', (err) => console.log(err.message))
			.pipe(source("main.js"))
			.pipe(gulp.dest(DEST + "/js"))
			.pipe(livereload())
	}

	bundler = browserify('./app/main.js', watchify.args)
	bundler.transform(babelify)
	bundler.on('update', bundle)

	return bundle()
})

gulp.task('webserver', ['build-app'], () => {
	return gulp.src(DEST)
	.pipe(webserver({
		port: 3002,
		livereload: true,
		open: true
	}))
})

gulp.task('default', ['watch'])