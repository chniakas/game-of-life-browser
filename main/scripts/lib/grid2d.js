window.GOL.Grid2D = (function (){
  function Grid2D(X, Y) {
    if (X <= 0 || Y <= 0) {
      this.grid = null;
      return;
    }

    this.grid = [];
    this.grid.length = X;
    for (var i = 0; i < X; i++) {
      this.grid[i] = [];
      this.grid[i].length = Y;
      for (var j = 0; j < Y; j++) {
        this.grid[i][j] = false;
      }
    }
  }

  Grid2D.prototype.getX = function() {
    return this.grid.length;
  };

  Grid2D.prototype.getY = function() {
    return this.grid[0].length;
  };

  Grid2D.prototype.isAlive = function (i, j) {
    return this.grid[i][j];
  };

  Grid2D.prototype.setAlive = function (i, j) {
    this.grid[i][j] = true;
  };

  Grid2D.prototype.setDead = function (i, j) {
    this.grid[i][j] = false;
  };

  Grid2D.prototype.toggle = function (i, j) {
    this.grid[i][j] = !this.grid[i][j];
  };

  Grid2D.prototype.clone = function() {
    var clonedGrid = JSON.parse(JSON.stringify(this.grid));
    var gridObject = new Grid2D(0, 0);
    gridObject.grid = clonedGrid;
    return gridObject;
  }

  Grid2D.prototype.countAliveNeighbours = function(i, j) {
    var count = 0;
    count += this.safeCountNeighbour(i, j - 1);
    count += this.safeCountNeighbour(i, j + 1);
    count += this.safeCountNeighbour(i - 1, j);
    count += this.safeCountNeighbour(i + 1, j);
    count += this.safeCountNeighbour(i - 1, j - 1);
    count += this.safeCountNeighbour(i - 1, j + 1);
    count += this.safeCountNeighbour(i + 1, j - 1);
    count += this.safeCountNeighbour(i + 1, j + 1);
    return count;
  };

  Grid2D.prototype.safeCountNeighbour = function(i, j) {
    if (i < 0 || i >= this.getX()) {
      return 0;
    }

    if (j < 0 || j >= this.getY()) {
      return 0;
    }

    return this.isAlive(i, j) ? 1 : 0;
  }

  return Grid2D;
})();
