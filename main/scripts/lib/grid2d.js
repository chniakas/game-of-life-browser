window.GOL.Grid2D = (function (){

  class Grid2D {

    constructor(X, Y) {
      if (X <= 0 || Y <= 0) {
        this.grid = null;
        return;
      }

      this.grid = Array(X);
      for (var i = 0; i < X; i++) {
        this.grid[i] = Array(Y);
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
      var gridObject = new Grid2D();
      gridObject.grid = JSON.parse(JSON.stringify(this.grid));
      return gridObject;
    }

    countAliveNeighbours(i, j) {
      var count = -this.safeCountNeighbour(i, j);
      [i - 1, i , i + 1].forEach((i) =>
      [j - 1, j , j + 1].forEach((j) =>
        count += this.safeCountNeighbour(i, j)));
      return count;
    }

    safeCountNeighbour(i, j) {
      var invalid = (m, M) => m < 0 || m >= M;

      if (invalid(i, this.getX()) || invalid(j, this.getY())) {
        return 0;
      }

      return this.isAlive(i, j);
    }
  }

  return Grid2D;
})();
