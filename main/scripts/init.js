window.GOL = {};
SystemJS.config({
  baseURL: './scripts'
});
SystemJS.import("main.js");
SystemJS.import("ui/grid.js");
SystemJS.import("ui/dom.js");
SystemJS.import("lib/GameOfLife.js");
SystemJS.import("lib/grid2d.js");
