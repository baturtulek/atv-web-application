
const directoryNames = {
  root: './',
  src: './src',
  public: './public',
};

const applicationPaths = {
  public: {
    root: `${directoryNames.public}`,
    vendor: `${directoryNames.public}/vendor`,
  },
};

const vendorFiles = {
  src: {
    jquery: './node_modules/jquery/dist/jquery.min.js',
    popperJs: './node_modules/popper.js/dist/umd/popper.min.js',
    popperJsMap: './node_modules/popper.js/dist/umd/popper.min.js.map',
    bootstrap: './node_modules/bootstrap/dist/**/*',
    bootstrapDatepicker: 'node_modules/bootstrap-datepicker/dist/**/*',
    fontAwesomeCss: './node_modules/@fortawesome/fontawesome-free/css/**/*',
    fontAwesomeWebFonts: './node_modules/@fortawesome/fontawesome-free/webfonts/**/*',
    datatableJquery: './node_modules/datatables.net/js/jquery.dataTables.js',
    datatableJs: './node_modules/datatables.net-bs4/js/dataTables.bootstrap4.js',
    datatableCss: './node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
  },
  public: {
    jquery: `${applicationPaths.public.vendor}/jquery`,
    popperJs: `${applicationPaths.public.vendor}/popper-js`,
    bootstrap: `${applicationPaths.public.vendor}/bootstrap`,
    bootstrapDatepicker: `${applicationPaths.public.vendor}/bootstrapDatepicker`,
    fontAwesomeCss: `${applicationPaths.public.vendor}/fontawesome/css`,
    fontAwesomeWebFonts: `${applicationPaths.public.vendor}/fontawesome/webfonts`,
    datatableJquery: `${applicationPaths.public.vendor}/datatables/js`,
    datatableJs: `${applicationPaths.public.vendor}/datatables/js`,
    datatableCss: `${applicationPaths.public.vendor}/datatables/css`,
  },
};

module.exports = {
  directoryNames,
  applicationPaths,
  vendorFiles,
};
