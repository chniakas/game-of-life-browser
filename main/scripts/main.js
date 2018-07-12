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
      var gameOfLife = new window.GOL.GameOfLife();
      var gameId = gamesOfLife.length;

      gameOfLife.setGridDimensions(Y, X);
      gamesOfLife.push(gameOfLife);
      intervals.push(null);
      window.GOL.grid.createFromGameOfLife(gameOfLife, gameId);
    });

    $(".games-container").on("click", ".grid-cell", function() {
      var info = window.GOL.dom.gameIndexFromCell(this);
      if (isGameInProgress(info.index)) {
        return;
      }

      window.GOL.dom.toggleCellInHtml(this);
      gamesOfLife[info.index].getGrid().toggle(info.j, info.i);
    });

    $(".games-container").on("click", ".startButton", function() {
      var index = window.GOL.dom.gameIndexFromButton($(this));
      clearIntervalIfNeeded(index);
      intervals[index] = setInterval(function () {
        var gameOfLife = gamesOfLife[index];

        var previousPoints = gameOfLife.getAlivePoints();
        gameOfLife.nextStep();
        var newPoints = gameOfLife.getAlivePoints();

        window.GOL.grid.updateFromGameOfLife(gameOfLife, index);
        if (window.GOL.areEqualPoints(previousPoints, newPoints)) {
          showStart(index);
        }
      }, 500);

      showStop(index);
    });

    $(".games-container").on("click", ".stopButton", function() {
      var index = window.GOL.dom.gameIndexFromButton($(this));
      showStart(index);
    });

    function clearIntervalIfNeeded(index) {
      if (isGameInProgress(index)) {
        clearInterval(intervals[index]);
        intervals[index] = null;
      }
    }

    function isGameInProgress(index) {
      return intervals[index] !== null;
    }

    function isValidDimension(d) {
      return d > 0 && d <= 10;
    }

    function showStart(index) {
      clearIntervalIfNeeded(index);
      $(`#game-${index} .startButton`).show();
      $(`#game-${index} .stopButton`).hide();
    }

    function showStop(index) {
      $(`#game-${index} .startButton`).hide();
      $(`#game-${index} .stopButton`).show();
    }
  })();
});
