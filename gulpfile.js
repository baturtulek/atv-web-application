
const gulp = require('gulp');
const merge = require('merge-stream');
const gulpConfig = require('./src/config/gulpConfig.js');

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
  const datatablesJquery = gulp
    .src(vendorFiles.src.datatableJquery)
    .pipe(gulp.dest(vendorFiles.public.datatableJs));
  const datatablesJs = gulp
    .src(vendorFiles.src.datatableJs)
    .pipe(gulp.dest(vendorFiles.public.datatableJs));
  const datatablesCss = gulp
    .src(vendorFiles.src.datatableCss)
    .pipe(gulp.dest(vendorFiles.public.datatableCss));
  const bootstrapDatepicker = gulp
    .src(vendorFiles.src.bootstrapDatepicker)
    .pipe(gulp.dest(vendorFiles.public.bootstrapDatepicker));
  const bootstrapSelect = gulp
    .src(vendorFiles.src.bootstrapSelect)
    .pipe(gulp.dest(vendorFiles.public.bootstrapSelect));
  return merge(
    jquery,
    popperJs,
    bootstrap,
    fontAwesomeCSS,
    fontAwesomeWebfonts,
    datatablesJquery,
    datatablesJs,
    datatablesCss,
    bootstrapDatepicker,
    bootstrapSelect
  );
};

exports.build = prepareVendorFiles;
