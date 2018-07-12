$(document).ready(function() {
  (function (){
    var intervals = [];
    var gamesOfLife = [];

    $("#setDimensions").click(function() {
      var X = +$("#x-dimension").val();
      var Y = +$("#y-dimension").val();
      if (!isValidDimension(X) || !isValidDimension(Y)) {
        alert('Please enter valid dimensions ([1, 10])');
        return;
      }
      var gameOfLife = new window.GOI.GameOfLife();
      gameOfLife.setGridDimensions(Y, X);
      gamesOfLife.push(gameOfLife);
      intervals.push(null);
      createGridFromGameOfLife(gameOfLife);
    });

    $(".games-container").on("click", ".grid-cell", function() {
      toggleCellInTable(this);
      toggleCellInGrid2d(this);
    });

    $(".games-container").on("click", ".startButton", function() {
      var index = gameIndexFromButton($(this));
      clearIntervalIfNeeded(index);
      intervals[index] = setInterval(function () {
        var gameOfLife = gamesOfLife[index];
        gameOfLife.nextStep();
        updateGridFromGameOfLife(index);
      }, 500);

      $(this).hide();
      $(".stopButton", $(this).parent()).show();
    });

    $(".games-container").on("click", ".stopButton", function() {
      var index = gameIndexFromButton($(this));
      clearIntervalIfNeeded(index);
      $(this).hide();
      $(".startButton", $(this).parent()).show();
    });

    function createGridFromGameOfLife(gameOfLife) {
      var rows = createData(gameOfLife.getGrid());
      createGridFromData(gameOfLife, rows);
    }

    function updateGridFromGameOfLife(index) {
      var rows = createData(gamesOfLife[index].getGrid());
      updateGridFromData(index, rows);
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
      var gameId = gamesOfLife.length;

      var gameDom = createDomFromTemplate("#game-template", {"id": gameId});
      var gridDom = createDomFromTemplate("#grid-template", {'rows': rows});

      $(".games-container").append(gameDom);
      $("#game-" + gameId + " .grid-container").html(gridDom);
      $("#game-" + gameId + " .stop-button").hide();
    }

    function updateGridFromData(index, rows) {
      var gridDom = createDomFromTemplate("#grid-template", {'rows': rows});
      var gameId = index + 1;
      $("#game-" + gameId + " .grid-container").html(gridDom);
    }

    function createDomFromTemplate(templateId, data) {
      var source = $(templateId).html();
      var template = Handlebars.compile(source);
      return template(data);
    }

    function toggleCellInTable(cell) {
      var state = $(cell).attr("title");
      var toggledState = state === "alive" ? "dead" : "alive";
      $(cell).attr("title", toggledState);
    }

    function toggleCellInGrid2d(cell) {
      var parentRow = $(cell).parent();
      var i = parentRow.children().index($(cell));
      var j = parentRow.parent().children().index(parentRow);
      var index = gameIndexFromRow(parentRow);
      gamesOfLife[index].getGrid().toggle(j, i);
    }

    function gameIndexFromRow(tableRow) {
      var gameContainer = tableRow.parent().parent().parent().parent();
      return indexFromGameContainer(gameContainer);
    }

    function gameIndexFromButton(button) {
      var gameContainer = button.parent().parent();
      return indexFromGameContainer(gameContainer);
    }

    function indexFromGameContainer(gameContainer) {
      var gameId = gameContainer.attr("id");
      var gameIndex = gameId.split("-")[1]
      return gameIndex - 1;
    }

    function clearIntervalIfNeeded(index) {
      var interval = intervals[index];
      if (isGameInProgress(interval)) {
        clearInterval(interval);
        intervals[index] = null;
      }
    }

    function isGameInProgress(interval) {
      return interval !== null;
    }

    function isValidDimension(d) {
      return d > 0 && d <= 10;
    }

  })();
});
