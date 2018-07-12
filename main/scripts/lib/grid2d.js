window.GOL.Grid2D = (function (){

  class Grid2D {

    constructor(X, Y) {
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

    getX() {
      return this.grid.length;
    }

    getY() {
      return this.grid[0].length;
    }

    isAlive(i, j) {
      return this.grid[i][j];
    }

    setAlive(i, j) {
      this.grid[i][j] = true;
    }

    setDead(i, j) {
      this.grid[i][j] = false;
    }

    toggle(i, j) {
      this.grid[i][j] = !this.grid[i][j];
    }

    clone() {
      var clonedGrid = JSON.parse(JSON.stringify(this.grid));
      var gridObject = new Grid2D(0, 0);
      gridObject.grid = clonedGrid;
      return gridObject;
    }

    countAliveNeighbours(i, j) {
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
    }

    safeCountNeighbour(i, j) {
      if (i < 0 || i >= this.getX()) {
        return 0;
      }

      if (j < 0 || j >= this.getY()) {
        return 0;
      }

      return this.isAlive(i, j) ? 1 : 0;
    }
  }

  return Grid2D;
})();
