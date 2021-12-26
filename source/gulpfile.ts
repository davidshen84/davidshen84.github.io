import { task } from 'gulp-shell';
import { dest, src } from 'vinyl-fs';
import { parallel, series } from 'gulp';
import * as del from 'del';

export function deleteOld() {
  return del(
    [
      '../3rdpartylicenses.txt',
      '../assets/',
      '../favicon.ico',
      '../index.html',
      '../*.js',
      '../*.json',
      '../*.css',
    ],
    { force: true },
  );
}

export function ngBuild() {
  return task('ng build --configuration production --aot')();
}

export function copyDist() {
  return src('dist/blog/**').pipe(dest('..'));
}

exports.default = series(parallel(deleteOld, ngBuild), copyDist);
