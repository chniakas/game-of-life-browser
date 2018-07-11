$(document).ready(function() {

  var gameOfLife = new GameOfLife();
  var interval = null;

  function clearIntervalIfNeeded() {
    if (interval !== null) {
      clearInterval(interval);
    }
  }

  $("#setDimensions").click(function() {
    clearIntervalIfNeeded();
    var X = +$("#x-dimension").val();
    var Y = +$("#y-dimension").val();
    if (!isValidDimension(X) || !isValidDimension(Y)) {
      alert('Please enter valid dimensions');
      return;
    }
    gameOfLife.setGridDimensions(X, Y);
    createGridFromGameOfLife(gameOfLife);
  });

  $("#startButton").click(function() {
    var nextGrid = function () {
      gameOfLife.nextStep();
      createGridFromGameOfLife(gameOfLife);
    }

    clearIntervalIfNeeded();
    interval = setInterval(nextGrid, 500);
  });

  $("#stopButton").click(function() {
    clearIntervalIfNeeded();
  });
});

function isValidDimension(d) {
  return d > 0;
}

function createGridFromGameOfLife(gameOfLife) {
  var rows = createData(gameOfLife.getGrid());
  createGridFromData(gameOfLife, rows);
}

function createData(grid) {
  var rows = [];
  for (var i = 0; i < grid.getX(); i++) {
    var columns = [];
    for (var j = 0; j < grid.getY(); j++) {
      var state = grid.isAlive(i, j) ? 'alive' : 'dead';
      columns.push({'state': state});
    }
    rows.push({'columns': columns});
  }
  return rows;
}

function createGridFromData(gameOfLife, rows) {
  var source = $("#grid-template").html();
  var template = Handlebars.compile(source);
  $(".grid-container").html(template({'rows': rows}));

  $(".grid-cell").click(function() {
    var state = $(this).attr("title");
    var toggledState = state === "alive" ? "dead" : "alive";
    $(this).attr("title", toggledState);

    var parentRow = $(this).parent();
    var i = parentRow.children().index($(this));
    var j = parentRow.parent().children().index(parentRow);
    gameOfLife.setAlivePoint({'x': j, 'y': i});
  });
}
