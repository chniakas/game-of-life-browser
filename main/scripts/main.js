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
      var gameId = gamesOfLife.length;

      gameOfLife.setGridDimensions(Y, X);
      gamesOfLife.push(gameOfLife);
      intervals.push(null);
      window.GOI.grid.createFromGameOfLife(gameOfLife, gameId);
    });

    $(".games-container").on("click", ".grid-cell", function() {
      window.GOI.dom.toggleCellInHtml(this);
      var info = window.GOI.dom.gameIndexFromCell(this);
      gamesOfLife[info.index].getGrid().toggle(info.j, info.i);
    });

    $(".games-container").on("click", ".startButton", function() {
      var index = window.GOI.dom.gameIndexFromButton($(this));
      clearIntervalIfNeeded(index);
      intervals[index] = setInterval(function () {
        var gameOfLife = gamesOfLife[index];
        gameOfLife.nextStep();
        window.GOI.grid.updateFromGameOfLife(gameOfLife, index);
      }, 500);

      $(this).hide();
      $(".stopButton", $(this).parent()).show();
    });

    $(".games-container").on("click", ".stopButton", function() {
      var index = window.GOI.dom.gameIndexFromButton($(this));
      clearIntervalIfNeeded(index);
      $(this).hide();
      $(".startButton", $(this).parent()).show();
    });

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
