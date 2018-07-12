window.GOI.GameOfLife = (function () {
  function GameOfLife() {
    this.grid = null;
  }

  GameOfLife.prototype.setGridDimensions = function(X, Y) {
    this.grid = new window.GOI.Grid2D(X, Y);
  };

  GameOfLife.prototype.getGrid = function() {
    return this.grid;
  };

  GameOfLife.prototype.setAlivePoints = function(points) {
    points.forEach((p) => this.grid.setAlive(p.x, p.y));
  };

  GameOfLife.prototype.getAlivePoints = function () {
    var alivePoints = [];
    for (var i = 0; i < this.grid.getX(); i++) {
      for (var j = 0; j < this.grid.getY(); j++) {
        if (this.grid.isAlive(i, j)) {
          alivePoints.push({'x': i, 'y': j})
        }
      }
    }
    return alivePoints;
  };

  GameOfLife.prototype.nextStep = function () {
    var cloneGrid = this.grid.clone();
    for (var i = 0; i < this.grid.getX(); i++) {
      for (var j = 0; j < this.grid.getY(); j++) {
        var aliveNeighbours = cloneGrid.countAliveNeighbours(i, j);
        if (this.grid.isAlive(i, j)) {
          if (aliveNeighbours < 2 || aliveNeighbours > 3) {
            this.grid.setDead(i, j);
          }
        }
        else if (aliveNeighbours === 3) {
          this.grid.setAlive(i, j);
        }
      }
    }
  };

  return GameOfLife;
})();


window.GOI.areEqualPoints = function (actualPoints, expectedPoints) {
    if (actualPoints.length !== expectedPoints.length) {
      return false;
    }

    var length = actualPoints.length;
    var equalPoints = (p1, p2) => p1.x === p2.x && p1.y === p2.y;

    for (var i = 0; i < length; i++) {
      if (expectedPoints.findIndex(
        (p) => equalPoints(actualPoints[i], p)) === -1 ) {
        return false;
      }
    }

    return true;
};
