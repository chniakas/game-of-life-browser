window.GOL.grid = (function () {

  function createFromGameOfLife(gameOfLife, gameId) {
    var rows = createData(gameOfLife.getGrid());
    createGridFromData(gameId, rows);
  }

  function createGridFromData(gameId, rows) {
    var gameDom = window.GOL.dom.createFromTemplate("#game-template", {"id": gameId});
    var gridDom = window.GOL.dom.createFromTemplate("#grid-template", {'rows': rows});

    $(".games-container").append(gameDom);
    $(`#game-${gameId} .grid-container`).html(gridDom);
    $(`#game-${gameId} .stopButton`).hide();
  }

  function updateFromGameOfLife(gameOfLife, index) {
    var rows = createData(gameOfLife.getGrid());
    updateGridFromData(index, rows);
  }

  function updateGridFromData(gameId, rows) {
    var gridDom = window.GOL.dom.createFromTemplate("#grid-template", {'rows': rows});
    $(`#game-${gameId} .grid-container`).html(gridDom);
  }

  function createData(grid2d) {
    var rows = [];
    for (var i = 0; i < grid2d.getX(); i++) {
      var columns = [];
      for (var j = 0; j < grid2d.getY(); j++) {
        var state = grid2d.isAlive(i, j) ? 'alive' : 'dead';
        columns.push({'state': state});
      }
      rows.push({'columns': columns});
    }
    return rows;
  }

  return {
    createFromGameOfLife: createFromGameOfLife,
    updateFromGameOfLife: updateFromGameOfLife
  };
})();
