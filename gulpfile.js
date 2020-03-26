
const gulp = require('gulp');
const merge = require('merge-stream');
const gulpConfig = require('./gulp-config.js');

const { vendorFiles } = gulpConfig;

const prepareVendorFiles = () => {
  const jquery = gulp
    .src(vendorFiles.src.jquery)
    .pipe(gulp.dest(vendorFiles.public.jquery));
  const popperJs = gulp
    .src(vendorFiles.src.popperJs)
    .pipe(gulp.dest(vendorFiles.public.popperJs));
  const bootstrap = gulp
    .src(vendorFiles.src.bootstrap)
    .pipe(gulp.dest(vendorFiles.public.bootstrap));
  const fontAwesomeCSS = gulp
    .src(vendorFiles.src.fontAwesomeCss)
    .pipe(gulp.dest(vendorFiles.public.fontAwesomeCss));
  const fontAwesomeWebfonts = gulp
    .src(vendorFiles.src.fontAwesomeWebFonts)
    .pipe(gulp.dest(vendorFiles.public.fontAwesomeWebFonts));
  const datatables = gulp
    .src(vendorFiles.src.datatableJs)
    .pipe(gulp.dest(vendorFiles.public.datatableJs));
  const datatablesCss = gulp
    .src(vendorFiles.src.datatableCss)
    .pipe(gulp.dest(vendorFiles.public.datatableCss));
  return merge(
    jquery,
    datatables,
    popperJs,
    bootstrap,
    fontAwesomeCSS,
    fontAwesomeWebfonts,
    datatablesCss,
  );
};

exports.build = prepareVendorFiles;
