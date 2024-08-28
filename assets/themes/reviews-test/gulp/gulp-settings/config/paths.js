const srcFolder = "./src";
const buildFolder = "../assets/app";
const siteUrl = "http://reviews-test/";

export const paths = {
  base: {
    src: srcFolder,
    build: buildFolder,
    url: siteUrl,
  },
  srcScss: `${srcFolder}/scss/**/*.scss`,
  buildCssFolder: `${buildFolder}/css`,
  srcFullJs: `${srcFolder}/js/**/*.js`,
  srcMainJs: `${srcFolder}/js/main.js`,
  buildJsFolder: `${buildFolder}/js`,
  resourcesFolder: `${srcFolder}/resources`,
};
