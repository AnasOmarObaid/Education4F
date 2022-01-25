import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import uglifyCss from 'gulp-uglifycss';
import imagemin from 'gulp-imagemin';
import imageminGifsicle from 'imagemin-gifsicle';
import gulpMozjpeg from 'imagemin-mozjpeg';
import jpegtran from 'imagemin-jpegtran';
import optipng from 'imagemin-optipng';
import svgo from 'imagemin-svgo';
import gulpSass from 'gulp-sass';
import nodeSass from 'node-sass';


const sass = gulpSass(nodeSass);


// sass task 
gulp.task('sass', () => {
    return gulp.src('src/scss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dest/css'))
});

// bootstrap task
gulp.task('bootstrap', () => {
    return gulp.src('src/bootstrap/bootstrap.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(rename('bootstrap.min.css'))
        .pipe(gulp.dest('dest/css'))
});

// js task
gulp.task('js', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('dest/js'))
});


// vendor styles task 
gulp.task('vendor_styles', () => {
    return gulp.src('src/plugins/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(uglifyCss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(sourcemaps.write())
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('dest/css'))
});

// vendor scripts task 
gulp.task('vendor_scripts', () => {
    return gulp.src('src/plugins/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dest/js'))
});

// imagemin task
gulp.task('imagemin', () => {
    return gulp.src('src/images/**/*.*')
        .pipe(imagemin([
            imageminGifsicle({
                interlaced: true
            }),
            jpegtran({
                progressive: true
            }),
            gulpMozjpeg({
                quality: 70,
                progressive: true
            }),
            optipng({
                optimizationLevel: 5
            }),
            svgo({
                plugins: [{
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: false
                    }
                ]
            })
        ]))
        .pipe(gulp.dest('dest/images'))
});
// exports tasks
gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/scss/bootstrap/**/*.scss', gulp.series('bootstrap'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
    gulp.watch('src/plugins/**/*.css', gulp.series('vendor_styles'));
    gulp.watch('src/plugins/**/*.js', gulp.series('vendor_scripts'));
    gulp.watch('src/images/**/*.*', gulp.series('imagemin'));
});