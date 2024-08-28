import gulp from "gulp";
import browserSync from "browser-sync";

import { paths } from "./gulp-settings/config/paths.js";
import { clean } from "./gulp-settings/tasks/clean.js";
import { styles } from "./gulp-settings/tasks/styles.js";
import { stylesBackend } from "./gulp-settings/tasks/styles-backend.js";
import { scripts } from "./gulp-settings/tasks/scripts.js";
import { scriptsBackend } from "./gulp-settings/tasks/scripts-backend.js";
import { resources } from "./gulp-settings/tasks/resources.js";
import { cacheTask } from "./gulp-settings/tasks/cache.js";
import { rewrite } from "./gulp-settings/tasks/rewrite.js";
import { zipFiles } from "./gulp-settings/tasks/zip.js";

global.app = {
  gulp,
  isProd: process.argv.includes("--build"),
  paths,
};

const watcher = () => {
  browserSync.init({
    proxy: {
      target: paths.base.url,
      ws: true,
    },
    reloadDelay: 100,
  });

  gulp.watch(app.paths.srcScss, styles);
  gulp.watch(app.paths.srcFullJs, scripts);
  gulp.watch(`${app.paths.resourcesFolder}/**`, resources);
  gulp.watch("../**/*.php").on("change", function () {
    browserSync.reload();
  });
};

const dev = gulp.series(clean, scripts, styles, resources, watcher);
const backend = gulp.series(clean, scriptsBackend, stylesBackend, resources);
const build = gulp.series(clean, scripts, styles, resources);
const cache = gulp.series(cacheTask, rewrite);
const zip = zipFiles;

export { dev };
export { build };
export { backend };
export { cache };
export { zip };

gulp.task("default", dev);
