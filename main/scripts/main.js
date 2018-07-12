$(document).ready(function() {
  (function (){
    var intervals = [];
    var games = [];

    const min = 1;
    const max = 10;

    $("#setDimensions").click(function() {
      var valid = (d) => d >= min && d <= max;
      var {X, Y} = getDimensions();
      if (!valid(X) || !valid(Y)) {
        alert(`Please enter valid dimensions in [${min}, ${max}]`);
        return;
      }
      var game = new window.GOL.GameOfLife();
      var gameId = games.length;

      game.setGridDimensions(Y, X);
      games.push(game);
      intervals.push(null);
      window.GOL.grid.createFromGameOfLife(game, gameId);
    });

    $(".games-container").on("click", ".grid-cell", function() {
      var info = window.GOL.dom.gameIndexFromCell(this);
      if (gameInProgress(info.index)) {
        return;
      }

      window.GOL.dom.toggleCellInHtml(this);
      games[info.index].getGrid().toggle(info.j, info.i);
    });

    $(".games-container").on("click", ".startButton", function() {
      var index = window.GOL.dom.gameIndexFromButton($(this));
      clearInterval(index);
      intervals[index] = setInterval(function () {
        var game = games[index];

        var previousPoints = game.getAlivePoints();
        game.nextStep();
        var newPoints = game.getAlivePoints();

        window.GOL.grid.updateFromGameOfLife(game, index);
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

    function getDimensions() {
      return {
        X: +$("#x-dimension").val(),
        Y: +$("#y-dimension").val()
      }
    }

    function resetInterval(index) {
      if (gameInProgress(index)) {
        clearInterval(intervals[index]);
        intervals[index] = null;
      }
    }

    function gameInProgress(index) {
      return intervals[index] !== null;
    }

    function showStart(index) {
      resetInterval(index);
      $(`#game-${index} .startButton`).show();
      $(`#game-${index} .stopButton`).hide();
    }

    function showStop(index) {
      $(`#game-${index} .startButton`).hide();
      $(`#game-${index} .stopButton`).show();
    }
  })();
});
