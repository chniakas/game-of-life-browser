var interval = null;

$(document).ready(function() {

  $("#stopButton").hide();

  var gameOfLife = new GameOfLife();

  $("#setDimensions").click(function() {
    clearIntervalIfNeeded();
    var X = +$("#x-dimension").val();
    var Y = +$("#y-dimension").val();
    if (!isValidDimension(X) || !isValidDimension(Y)) {
      alert('Please enter valid dimensions');
      return;
    }
    gameOfLife.setGridDimensions(Y, X);
    createGridFromGameOfLife(gameOfLife);
  });

  $("#startButton").click(function() {

    if (gameOfLife.getGrid() == null) {
      alert("Create a grid first!");
      return;
    }

    clearIntervalIfNeeded();
    interval = setInterval(function () {
      gameOfLife.nextStep();
      createGridFromGameOfLife(gameOfLife);
    }, 500);

    $(this).hide();
    $("#stopButton").show();
  });

  $("#stopButton").click(function() {
    clearIntervalIfNeeded();
    $(this).hide();
    $("#startButton").show();
  });
});

function createGridFromGameOfLife(gameOfLife) {
  var rows = createData(gameOfLife.getGrid());
  createGridFromData(gameOfLife, rows);
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

function createGridFromData(gameOfLife, rows) {
  createHandlebarsTable(rows);

  $(".grid-cell").click(function() {
    if (isGameInProgress()) {
      return;
    }
    toggleCellInTable(this);
    toggleCellInGrid2d(gameOfLife, this);
  });
}

function createHandlebarsTable(rows) {
  var source = $("#grid-template").html();
  var template = Handlebars.compile(source);
  $(".grid-container").html(template({'rows': rows}));
}

function toggleCellInTable(cell) {
  var state = $(cell).attr("title");
  var toggledState = state === "alive" ? "dead" : "alive";
  $(cell).attr("title", toggledState);
}

function toggleCellInGrid2d(gameOfLife, cell) {
  var parentRow = $(cell).parent();
  var i = parentRow.children().index($(cell));
  var j = parentRow.parent().children().index(parentRow);
  gameOfLife.getGrid().toggle(j, i);
}

function clearIntervalIfNeeded() {
  if (isGameInProgress()) {
    clearInterval(interval);
    interval = null;
  }
}

function isGameInProgress() {
  return interval !== null;
}

function isValidDimension(d) {
  return d > 0;
}
