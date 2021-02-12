"use strict";

const gulp = require('gulp');
const browsersync = require("browser-sync").create();
const minify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

const paths = {
    js: {
        src: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/slick-carousel/slick/slick.js',
            'src/js/*.js',
        ],
        build: ['assets/js/']
    },
    css: {
        src: [
            'node_modules/slick-carousel/slick/slick.scss',
            'src/sass/style.scss',
        ],
        build: ['assets/css'],
        srcWatch: [
            'src/sass/**/*.scss',
        ]
    },
    php: {
        src: ['**/*.php']
    }
};

// BrowserSync
function browserSync(done) {
    browsersync.init({
        proxy: "localhost/like/",
        browser: ["firefox"]
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean assets
function clean() {
    return del(['assets/css'], ['assets/js']);
}

// CSS task
function css() {
    return gulp
        .src(paths.css.src)
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['> 1%', 'last 3 versions'] }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.css.build))
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(paths.css.build));
}

function js() {
    return gulp
        .src(paths.js.src)
        .pipe(concat('scripts.js'))
        .pipe(minify({ compress: true }))
        .pipe(gulp.dest(paths.js.build))
};


// Watch files
function watchFiles(done) {
    gulp.watch(paths.css.srcWatch, gulp.series(css, browserSyncReload));
    gulp.watch(paths.js.src, gulp.series(js, browserSyncReload));
    gulp.watch(paths.php.src, gulp.series(browserSyncReload));
    done();
}

// define complex tasks
const build = gulp.series(clean, gulp.parallel(css, js));
const watch = gulp.series(browserSync, watchFiles);

// export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;