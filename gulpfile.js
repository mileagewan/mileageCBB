const ts = require('gulp-typescript');
const gulp = require('gulp');

const tsProject = ts.createProject('./tsconfig.json');
gulp.task('default', () => {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'));
});
