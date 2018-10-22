const gulp = require('gulp');
const nodemon = require('gulp-nodemon')

const UNIT_TEST_PATHS = {
    mochaCSS: 'node_modules/mocha/mocha.css',
    mochaJS: 'node_modules/mocha/mocha.js',
    chaiJS: 'node_modules/chai/chai.js',
    chaiHTTPJS: 'node_modules/chai-http/dist/chai-http.js',
    sinonJS: 'node_modules/sinon/pkg/sinon.js',
    jquery: 'node_modules/jquery/dist/jquery.min.js'
    
};

gulp.task('unitTestCSS', function() {
    return gulp.src([UNIT_TEST_PATHS.mochaCSS])
        .pipe(gulp.dest('public/css'));
});

gulp.task('unitTestJS', function() {
    return gulp.src([UNIT_TEST_PATHS.mochaJS, UNIT_TEST_PATHS.chaiJS, UNIT_TEST_PATHS.sinonJS, UNIT_TEST_PATHS.jquery, UNIT_TEST_PATHS.chaiHTTPJS])
        .pipe(gulp.dest('public/js'));
});

gulp.task('start', function() {
    nodemon({
        script: 'server.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' }
    })
});

gulp.task('dev', ['unitTestCSS', 'unitTestJS', 'start'])