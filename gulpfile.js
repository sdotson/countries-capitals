var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var ghpages = require('gulp-gh-pages');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('sass', function () {
    gulp.src('app/assets/sass/**/*')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('app/assets/css'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["app/assets/css/*.css", 'app/**/*.js','app/**/*.html'], {
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('imagemin', function () {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('images/build'));
});

/*var files = ['app/app.js',
            'app/bower_components/angular/angular.min.js',
            'app/bower_components/angular-animate/angular-animate.min.js',
            'app/index.html'];

gulp.task('build', function() {
    return gulp.src(files,{base:'./'})
    .pipe(gulp.dest('./build'));
});*/

gulp.task('deploy', ['build'],function() {
    return gulp.src('./build/**/*').pipe(ghpages());
});

gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("app/assets/sass/*/*.scss", ['sass']);
});