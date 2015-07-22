var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var ghpages = require('gulp-gh-pages');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var ngmin = require('gulp-ngmin');
var clean = require('gulp-clean');

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

var paths = {
  scripts: [ 'app/*.js','app/**/*.js', '!app/bower_components/**/*.js' ],
  html: [
    './app/**/*.html',
    './app/index.html',
    '!./app/bower_components/**/*.html'
  ],
  index: './app/index.html',
  build: './build/'
}

/*gulp.task('build', ['usemin']);*/

gulp.task('usemin', function(){
  gulp.src( paths.index )
    .pipe(usemin({
      js: [ ngmin(), uglify() ]
    }))
    .pipe(gulp.dest( paths.build ))
});

var files = ['app/assets/**/*',
            'app/countries-list/*',
            'app/country-detail/*',
            'app/home/*',
            'app/bower_components/angular/angular.min.js',
            'app/bower_components/angular-route/angular-route.min.js',
            'app/bower_components/angular-animate/angular-animate.min.js',
            'app/index.html',
            'app/app.js',
            'app/countries.js'
            ];

gulp.task('build', function() {
    return gulp.src(files,{base:'./app'})
    .pipe(gulp.dest('./build'));
});

gulp.task('deploy', ['build'],function() {
    return gulp.src('./build/**/*').pipe(ghpages());
});

gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("app/assets/sass/*/*.scss", ['sass']);
});