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

  return this.isAlive(i, j)? 1 : 0;
}


function GameOfLife() {
  this.grid = null;
}

GameOfLife.prototype.setGridDimensions = function(X, Y) {
  this.grid = new Grid2D(X, Y);
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
