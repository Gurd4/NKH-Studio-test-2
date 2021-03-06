const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sync = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require('del');

// Styles

const styles = () => {
  return gulp.src('source/less/style.less')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
}

exports.styles = styles;

//Image

const images = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.mozjpeg({progressive: true}),
        imagemin.svgo()
    ]))
}

exports.images = images;

const imgwebp = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('source/img'))
}

exports.imgwebp = imgwebp;

//SVG-sprite

const sprite = () => {
  return gulp.src('source/img/icon-*.svg')
    .pipe(svgstore())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'))
}

exports.sprite = sprite;

//HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(gulp.dest('build'));
  };

exports.html = html;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

//Copy

const copy = () => {
  return gulp.src ([
    'source/fonts/*.{woff,woff2}',
    'source/img/**',
    'source/js/**',
    'source/*.ico'
  ], {
      base: 'source'
  })
  .pipe(gulp.dest('build'));
};

exports.copy = copy;

//del

const clean = () => {
  return del('build');
};

exports.clean = clean;

const build = gulp.series(
  clean,
  copy,
  styles,
  sprite,
  html
);

exports.build = build;


// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series('styles'));
  gulp.watch('source/*.html').on('change', sync.reload);
}

exports.default = gulp.series(build, server, watcher);
