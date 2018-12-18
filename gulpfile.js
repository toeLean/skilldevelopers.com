var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require("run-sequence");
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');


gulp.task("sass", function() {
  return gulp.src("scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano({zindex: false}))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("static/css"));
});

gulp.task("script", function() {
  return gulp.src('js/!(*.min.js*)')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('static/js'));
});

gulp.task("watch", function() {
  gulp.watch("scss/**/*.scss", ["sass"]);
  gulp.watch("js/!(*.min.js*)", ["script"]);
});

gulp.task('imagemin', () =>
	gulp.src('static/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('static/img'))
);

gulp.task("default", function(callback) {
		runSequence(["sass", "script", "watch"],
		callback
	);
});